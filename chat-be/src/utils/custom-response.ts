export default class APIResponse {
    public success: Boolean;
    public data: Array<object> | object;
    public count: Number;
    public limit!: number;
    public offset!: number;
    public page!: number;
    public pages!: number;
    public error: Array<object>;
    constructor(
        data: Array<object> | object,
        count: number = 1,
        limit?: number,
        offset?: number,
        page?: number,
        pages?: number
    ) {
        this.success = true;
        this.data = data;
        this.count = count;
        this.error = [];

        if (limit) {
            this.limit = limit;
        }

        if (offset) {
            this.offset = offset;
        }

        if (page) {
            this.page = page;
        }

        if (pages) {
            this.pages = pages;
        }
    }
}
