export class WorkspaceDto {
    constructor(
        public name: string,
        public type: string,
        public contents: string,
        public id?: number | null,
        public parentId?: number | null,
    ) {}
}
