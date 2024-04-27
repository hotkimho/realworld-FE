import {ARTICLE_BUCKET, REGION} from "../config/config";

export const uploadImageToS3 = async (url: string, file: File) => {
    // put으로 url에 이미지 파일 업로드

    console.log("upload url ", url)

    const response = await fetch(
        new Request(url, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": "image/png"
            }
        })
    );

    if (response.status !== 200) {
        throw new Error("Failed to upload image to S3");
    }
}