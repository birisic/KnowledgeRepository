import { UseCase } from "../enums/use-case.enum";

export class WorkspaceUseCasesDto {
    public constructor(
        public workspaceId: number,
        public useCases: UseCase[]
    ) {}

    // Method to check if a specific use case is included
    // hasUseCase(useCase: UseCase): boolean {
    //     return this.useCases.includes(useCase);
    // }
}