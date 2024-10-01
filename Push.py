import requests, json, logging, traceback
from os import environ, path

def get_environ(key, default="", output=True):
    def no_read():
        if output:
            print(f"未填写环境变量 {key} 请添加")
            exit(0)
        return default
    return environ.get(key) if environ.get(key) else no_read()

appToken = get_environ("WP_APP_TOKEN")
WP_TOPICIDS0 = get_environ("WP_TOPICIDS")
WP_TOPICIDS = [WP_TOPICIDS0]

uids = []

def PushMessageSetConfig(app_token,topicId, uid):
    global appToken, uids,WP_TOPICIDS
    appToken = app_token
    WP_TOPICIDS = topicId
    uids = uid

def PushMessage(summary, content):
    if len(appToken) == 0:
        return
    url = "https://wxpusher.zjiecode.com/api/send/message"
    payload = {
        "appToken": appToken,
        "content": content,
        "summary": summary,
        "contentType": 1,
        "topicIds": WP_TOPICIDS,
        "uids": uids
    }
    payload = json.dumps(payload)
    logging.info("summary: %s, content: %s.", summary, content)
    logging.info("appToken: %s, WP_TOPICIDS: %s.", appToken, WP_TOPICIDS)
    header = {"content-type": "application/json"}
    try:
        r = requests.post(url, data = payload, headers = header)
        logging.info(r.text)
    except Exception as e:
        logging.error("Exception: %s", traceback.format_exc())
    pass

def main():
    # logging.basicConfig(level=logging.INFO)
    # PushMessage("test summary", "test content")
    pass

if __name__ == "__main__":
    main()
