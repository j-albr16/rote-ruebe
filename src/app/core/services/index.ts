import { AuthService} from './auth.service';
import { ChatService} from './chat.service';

export const services: any[] = [AuthService, ChatService];

export * from './auth.service';
export * from './chat.service';
