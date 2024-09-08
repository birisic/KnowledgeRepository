export class DocumentDto {
    public constructor(
        public name: string,
        public contents: string | null
    ) {}
}