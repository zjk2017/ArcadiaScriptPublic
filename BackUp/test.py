SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBiqj=None
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs=print
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijq=exit
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBqj=Exception
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBqi=False
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBjq=str
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBji=int
import hashlib
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjqs=hashlib.md5
import time
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjis=time.sleep
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjqi=time.time
import requests
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjiq=requests.post
import random
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBisq=random.randint
import json
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBisj=json.loads
import os
SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBiqs=os.getenv
def SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqis():
 SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqj=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBiqs('trda_sign')
 if SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqj==SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBiqj:
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('env is none')
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijq(0)
 try:
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqj=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBisj(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqj.replace("'",'"'))
  return SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqj
 except SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBqj as e:
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('err:',e)
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('your env is:',SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqj)
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijq(0)
def SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqij(t,m):
 try:
  import notify
  notify.send(t,m)
 except SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBqj as e:
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs(e)
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('TianRuiDiAn Lottery Push error')
class SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqji():
 def __init__(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi,cg):
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.sid=cg.get('sid')
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.aid=cg.get('aid')
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.name=cg.get('name')
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.headers={'User-Agent':'Mozilla/5.0 (Linux; Android 13; SM-G959N Build/NRD909M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36;xsb_ruian;xsb_ruian;2.31.747;native_app;6.12.0','content-type':'application/x-www-form-urlencoded','Accept':'*/*','Origin':'https://crm.rabtv.cn','X-Requested-With':'com.test.android.app.ruian','Referer':'https://crm.rabtv.cn/sign/index.html'}
 def SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjsq(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi):
  global SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj
  u='https://crm.rabtv.cn/v2/user/oauth'
  p={'account_id':SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.aid,'sessionId':SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.sid}
  r=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjiq(u,headers=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.headers,data=p)
  if 'access_token' not in r.text:
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs(r.text)
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj+=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.name+':login error'+'\n'
   return SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBqi
  rj=r.json()
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsjq=rj.get('data').get('access_token')
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.user_code=rj.get('data').get('user_code')
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.headers.update({'Authorization':'Bearer '+SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsjq})
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.name,':登录成功')
 def SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjsi(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi):
  global SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj
  u='https://crm.rabtv.cn/v2/index/signIn'
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsji=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBjq(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBji(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjqi()*1000))
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsiq=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjqs(('hjSgbnw&Zdoky8M9ckJGIdpOm0!xDpEn'+SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsji).encode()).hexdigest()
  p={'user_code':SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.user_code,'user_code1':'_a_test_'+SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.user_code,'sign':SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsiq,'time':SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsji}
  r=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjiq(u,headers=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.headers,data=p)
  if '已经签到' in r.text:
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('您今日已经签到过')
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj+=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.name+':您今日已经签到过'+'\n'
  elif 'continue_sign_num' in r.text:
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsij=r.json()['data']['continue_sign_num']
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('continue_sign_num:',SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsij)
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj+=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.name+':您已经签到过'+SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKsBjq(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsij)+'次'+'\n'
  else:
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs(r.text)
   SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj+=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBsqi.name+':sign error'+'\n'
if __name__=='__main__':
 SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj=''
 for SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsi in SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqis():
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqjs=SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqji(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsi)
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqjs.SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjsq()
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjis(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBisq(2,3))
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqjs.SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjsi()
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBjis(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBisq(2,3))
  SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs('-'*30)
 SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBijs(SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj)
 SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqij('TianRuiDiAn Push',SafmJFhQUVlXpOLRIWgYzbMADTNuwkxvEGdHCnteyocPrKBqsj)
