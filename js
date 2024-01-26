
import os  
import time  
import datetime  
from watchdog.observers import Observer  
from watchdog.events import FileSystemEventHandler  
  
class MyHandler(FileSystemEventHandler):  
    def on_modified(self, event):  
        print(f'文件已被修改: {event.src_path}')  
        os.chmod(event.src_path, os.stat(event.src_path).st_mode | 0o200)  # 去掉只读属性  
  
    def on_created(self, event):  
        print(f'新文件已创建: {event.src_path}')  
        os.chmod(event.src_path, os.stat(event.src_path).st_mode | 0o200)  # 去掉只读属性  
  
if __name__ == "__main__":  
    folder_path = 'D:/a/WeChat Files/wxid_f0000000000000/FileStorage/File/2023-09'  # 请将 'D:/ab/YYYY-MM' 替换为要监视的实际路径  
  
    # 将路径中的"2023-09"替换为当前日期  
    current_date = datetime.datetime.now().strftime("%Y-%m")  
    folder_path = folder_path.replace("2023-09", current_date)  
  
    event_handler = MyHandler()  
    observer = Observer()  
    observer.schedule(event_handler, path=folder_path, recursive=False)  
    observer.start()  
  
    try:  
        while True:  
            time.sleep(10)  # 每秒检查一次  
    except KeyboardInterrupt:  
        observer.stop()  
    observer.join()
