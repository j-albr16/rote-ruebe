import {existsSync, readFile, writeFile} from 'fs';
import {resolve} from 'path';


export enum PathKey {HttpRequest, HttpError, HttpResponse}

export const PATH_ROOT = resolve(__dirname, '../');

const paths = {
    HttpRequest: resolve(PATH_ROOT, 'data', 'log', 'http-request-log.txt'),
  HttpResponse: resolve(PATH_ROOT, 'data', 'log', 'http-response-log.txt'),
  HttpError: resolve(PATH_ROOT, 'data', 'log', '')
};

export const getPath = (pathKey: PathKey) => {
    return paths[pathKey];
};


export const read = async (pathKey: PathKey, defaultValue = '[]'): Promise<string> => {
    const path = getPath(pathKey);
    return new Promise((res, rej) => {
        const b_exist = existsSync(path);
        if (!b_exist) return res('[]');
        readFile(path, 'utf8', (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
};

export const write = (data: string, pathKey: PathKey) => {
    const path = getPath(pathKey);
    writeFile(path, data, err => {
        if (err) throw err;
    });
};
