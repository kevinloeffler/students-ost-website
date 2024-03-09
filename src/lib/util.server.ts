import crypto from "crypto";
import fs from "fs/promises";

export async function saveImageToDisk(file: Optional<FileObject | string>, directory: string): Promise<string> {
    if (!file) return ''  // could add the path to a placeholder image here
    if (typeof file === 'string') {
        if (file.length === 0) return ''  // could add the path to a placeholder image here
        return file  // return existing file path
    }

    if (Object.keys(file.data!).length === 0) throw new Error('Trying to safe empty file')

    const fileObject: FileObject = file
    const fileData = fileObject.data as {[key: string]: number}
    const length = Object.keys(fileData).length
    const fileArray = new Uint8Array(length)
    for (let index = 0; index < length; index++) {
        fileArray[index] = fileData[`${index}`]
    }

    const fileName = crypto.randomUUID() + '.' + fileObject.suffix
    const path = `static/images/user_uploaded/${directory}/${fileName}`
    await fs.writeFile(path, fileArray)
    return `/images/user_uploaded/${directory}/${fileName}`
}
