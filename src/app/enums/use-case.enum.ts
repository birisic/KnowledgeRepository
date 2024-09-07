export enum UseCase { // starts from 2 to be compatible with the backend IDs
    WorkspaceDeletion = 2,          // Delete workspace
    WorkspaceRetrieval = 3,        // Get workspace
    WorkspaceCreation = 4,         // Create workspace
    WorkspaceModification = 5,      // Update document contents, or any workspace's owner or parent
    UserWorkspaceUseCaseModification = 6, // Update user use case for a workspace
}