export const MAX_WIDTH = 2160;
export const QUALITY_ARRAY = [
  80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10,
];
export const MAX_VIDEO_SIZE_BYTES = 104857600;
export const MAX_IMAGE_SIZE_BYTES = 5242880;
export const ONE_MB_IN_BYTES = 1024 ** 2;
export const ONE_MINUTE = 60;
export const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;

export const ONE_WEEK_IN_SECOND = 60 * 60 * 24 * 7;
export const BIG_FILE_EXCEPTION = (size: number, maxSize: number): string =>
  `Too big file size: ${Math.round(size / 1048576)}MB
Max available file size: ${Math.round(maxSize / 1048576)}MB`;
