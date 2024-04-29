declare interface DateStackI {
    stack: Array<{ fileName: string, fileKey: string }>,
    loadDone: boolean,
    fileCount: number,
    readFileCount: number
}