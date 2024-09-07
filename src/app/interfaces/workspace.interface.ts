import { WorkspaceType } from "../enums/workspace-type.enum";

export interface Workspace {
  id: number;
  name: string;
  type: WorkspaceType;
  ownerId: number;
  parentId?: number | null;
  contents?: string | null;            
}