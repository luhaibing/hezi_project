package com.hezi_project.download.basic.bean;

/**
 * 下载信息的集合体
 * 包括多条线程信息的总和
 */
public class LoadInfo {

    private int fileSize;//文件大小

    private int completeSize;//完成度

    private String url;//下载器标识

    private String filePath;// 文件的保存路径

    public LoadInfo(int size, int complete, String u,
                    String path) {
        this.fileSize = size;
        this.completeSize = complete;
        this.url = u;
        this.filePath = path;
    }

    public String getFilePath() {
        return filePath;
    }

    public int getFileSize() {
        return fileSize;
    }

    public int getCompleteSize() {
        return completeSize;
    }

    /**
     * 已经下载的数据量增长
     *
     * @param complete
     */
    public void increaseComplete(int complete) {
        this.completeSize += complete;
    }

    public String getUrl() {
        return url;
    }

    /**
     * 检查是否已经完成
     */
    public boolean checkIsComplete() {
        return getCompleteSize() == getFileSize();
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "LoadInfo [fileSize=" + fileSize + ", completeSize=" + completeSize
                + ", url=" + url + "]";
    }

}
