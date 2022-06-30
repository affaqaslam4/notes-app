export interface INoteDto {
    id: number;
    title: string;
    summary?: string;
    labels: number[];
    startDate: number;
    endDate: number;
}
