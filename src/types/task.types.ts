export type Priority = 'low' | 'mid' | 'high';
export type FilterStatus = 'ALL' | 'ACTIVE' | 'COMPLETED';

export interface Task {
    id: number;
    title: string;
    isDone: boolean;
    createdAt: Date;
    priority: Priority;
}
