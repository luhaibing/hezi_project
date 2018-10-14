package com.hezi_project.download.basic.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.annotation.Nullable;

public class DBHelper extends SQLiteOpenHelper {

    // 数据库名
    private final static String DATABASE_FILENAME = "download.db";
    private static final int versionCode = 1;
    // 表名
    private String TABLE_NAME = "download_info";

    public DBHelper(@Nullable Context context) {
        super(context, DATABASE_FILENAME, null, versionCode);
    }

    /**
     * 创建数据库
     */
    @Override
    public void onCreate(SQLiteDatabase db) {

        db.execSQL("create table " + TABLE_NAME + "(" +
                "_id integer PRIMARY KEY AUTOINCREMENT, " +// 主键
                "thread_id integer, " + // 线程 id
                "start_pos integer, " +// 该线程任务起始位置
                "end_pos integer, " + // 该线程任务终止位置
                "compelete_size integer, " + // 该线程任务已下载的数据量
                "url char)"); // // 该线程任务的下载地址
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

}
