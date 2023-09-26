export type loginPlayload = {
    username: string;
    password: string;
};

export type loginPlayloadResponse = {
    result: { accessToken: string };
};

export function postLogin({ username, password }: loginPlayload): Promise<loginPlayloadResponse> {
    if (username === 'student' && password === '12345') {
        return Promise.resolve({ result: { accessToken: '2' } });
    } else if (username === 'admin' && password === '12345') {
        return Promise.resolve({ result: { accessToken: '1' } });
    }
    return Promise.reject({ result: { accessToken: 'error' } });
}
