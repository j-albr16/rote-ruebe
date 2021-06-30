/* tslint:disable:ban-types */
import {SocketEvent, SocketSpace, SocketEntries} from 'rote-ruebe-types';
import {Socket, io} from 'socket.io-client';

type LiftBody<Event extends SocketEvent<{}, Function | undefined>> = Event['body'];

type CallbackInterface<Event extends SocketEvent<{}, Function | undefined>> =
  Event['callback'] extends undefined ? void : {callback: NonNullable<Event['callback']>}

type HandlerFunction<Events extends SocketEntries> =
  {[key in keyof Events]: (body: LiftBody<Events[key]> & CallbackInterface<Events[key]>) => void};

type SimpleHandlerFunction<Events> = Partial<{[key in keyof Events]: (body: Events[key]) => void}>;

export type UndefinedOptional<T> = T extends undefined ? void : T;

export enum DisconnectReason {
  ServerDisconnect = 'io server disconnect',
  ClientDisconnect = 'io client disconnect',
  Timeout = 'ping timeout',
  TransportClose = 'transport close',
  TransportError = 'transport error'
}

const extraKeys = {
  connect: null,
  disconnect: DisconnectReason.ClientDisconnect,
  connect_error: null
};

type InitReturnType<Events extends SocketEntries> =
  (clientHandler: HandlerFunction<Events>, extraHandler: SimpleHandlerFunction<typeof extraKeys>) => Socket

export const initSpaceSocket = <ClientEvents extends SocketEntries, ServerEvents extends SocketEntries>
(space: SocketSpace<ClientEvents, ServerEvents>, auth?: {token: string}, testIo?: Socket):
  InitReturnType<ServerEvents> => {

  const spaceSocket = testIo ?? io(space.path, {
    auth
  });

  const func = <CE, SE extends SocketEntries>
  (i: {clientEvents: CE, serverEvents: SE}) => {

    return (serverHandler: HandlerFunction<ServerEvents>, extraHandler: SimpleHandlerFunction<typeof extraKeys>) => {
      const bothHandler = Object.assign(serverHandler, extraHandler);
      Object.entries(bothHandler).forEach((key) => {
        spaceSocket.on(i.serverEvents[key[0]]?.name ?? key[0], (body, callback) => {
          const typedObject = Object.assign(body, {callback});
          key[1](typedObject)
        })
      });
      return spaceSocket;
    };
  };
  return space.forming<InitReturnType<ServerEvents>>(func);
};

export const ioSenderWrapper =
  (socket: Socket) =>
    <Body, Callback extends Function | undefined>(socketEvent: SocketEvent<Body, Callback>) => ioSender(socketEvent, socket);

export const ioSender = <Body, Callback extends Function | undefined>(socketEvent: SocketEvent<Body, Callback>, socket: Socket) => {
  return (body: Body, callback: UndefinedOptional<Callback>) => socket.emit(socketEvent.name, body, callback);
};
