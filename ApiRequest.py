import os
import traceback

import requests
import urllib3

import mytool
import notify


class ApiRequest:
    def __init__(self):
        urllib3.disable_warnings()
        self.sec = requests.session()
        self.sec.verify = False
        self.sec.trust_env = False
        self.sendmsg = ''
        self.title = ''

    def send(self):
        notify.send(self.title, self.sendmsg)


class ApiMain:
    def __init__(self, funcName):
        self.funcName = funcName
        pass

    def run(self, envName, request):
        if os.path.exists('debug.py'):
            import debug
            debug.setDebugEnv()

        if mytool.getlistCk(f'{envName}') is None:
            print(f'请检查你的变量名称 {envName} 是否填写正确')
            exit(0)
        else:
            for i in mytool.getlistCk(f'{envName}'):
                for func in self.funcName:
                    try:
                        getattr(request(i), func)()
                    except:
                        traceback.print_exc()
        pass
