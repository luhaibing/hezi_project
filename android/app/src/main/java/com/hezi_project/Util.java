package com.hezi_project;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.support.v4.content.FileProvider;

import java.io.File;

public class Util {

    private Util() {
        throw new UnsupportedOperationException();
    }

    /**
     * 检查是否为空
     *
     * @param t        检查目标
     * @param errorMsg 为空时的错误信息
     * @param <T>      目标泛型
     * @return 检查目标
     */
    public static <T> T chackNotNull(T t, String errorMsg) {
        if (t == null) {
            throw new NullPointerException(errorMsg);
        }
        return t;
    }

    public static <T> T chackNotNull(T t) {
        return chackNotNull(t, null);
    }

    /**
     * 安装
     *
     * @param activity 上下文
     * @param apkPath  apk下载完成在手机中的路径
     */
    public static void installApk(Activity activity, String apkPath) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        //版本在7.0以上是不能直接通过uri访问的
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.N) {
            File file = (new File(apkPath));
            // 由于没有在Activity环境下启动Activity,设置下面的标签
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            //参数1:上下文, 参数2:Provider主机地址 和配置文件中保持一致,参数3:共享的文件
            Uri apkUri = FileProvider.getUriForFile(activity, "com.xinxianshi.fileprovider", file);
            //添加这一句表示对目标应用临时授权该Uri所代表的文件
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        } else {
            intent.setDataAndType(Uri.fromFile(new File(apkPath)),
                    "application/vnd.android.package-archive");
        }
        activity.startActivity(intent);
    }


}
