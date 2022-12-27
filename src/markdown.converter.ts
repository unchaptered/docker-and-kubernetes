export function convertMarkdownFile(fileteredFileList: string[]): string {
    let markdown = `
# Docker and Kubernetes

Learning for Docker and Kubernetes

## Chapters`;

    const BASE_URL = 'https://github.com/unchaptered/docker-and-kubernetes/tree/main/';
    for (const filteredFile of fileteredFileList) {
        const LITERAL_URL = BASE_URL + filteredFile;
        const ENCODED_URL = encodeURI(LITERAL_URL);
        markdown += `\n\n[${filteredFile}](${ENCODED_URL})`;
    }

    return markdown;
}
