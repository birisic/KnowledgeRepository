import { UseCase } from "../enums/use-case.enum";

export class WorkspaceUseCasesDto {
    public constructor(
        public workspaceId: number,
        public useCases: UseCase[]
    ) {}
}