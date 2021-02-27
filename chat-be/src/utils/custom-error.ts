
export default class APIError extends Error {
    public code: Number;
    public success: Boolean;
    public data: [];
    public count: Number;
    public error: [{}];
    constructor(message, code = 400) {
        super(message);
        this.code = code;
        this.message = message;
        this.success = false;
        this.data = [];
        this.count = 0;
        this.error = [{ code: code, message: message, success: this.success }]
    }
}
