/*
 * 作者：夏梦&柠檬玩机
 * 小程序:沪上阿姨
 * 日期 2023-06-28
 * 抓包:请求链接https://webapi.qmai.cn/web/catering/integral/sign/signIn请求体中的accountToken
 * 抓不到包的删除小程序清除缓存,开着抓包重新打开小程序
 * 变量格式 export hsayhd='accountToken'
 * ck有效期未知
 * 多个账号用@和换行分割
 * 定时：一天一次
 * cron: 54 9 * * *
 * 奖励:
 * 本脚本仅用于学习使用请勿直接运行
 * new Env("沪上阿姨")
 * fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息
更新cron
 */

//
//基础变量////////////////////////////////////////////
var version_='jsjiami.com.v7';function _0x20e1(_0x47626a,_0x5c2ddd){const _0x87bda4=_0x87bd();return _0x20e1=function(_0x20e18f,_0x1691a3){_0x20e18f=_0x20e18f-0x1e7;let _0x582a4e=_0x87bda4[_0x20e18f];if(_0x20e1['dktLIo']===undefined){var _0x589bfb=function(_0x10ab6f){const _0x4ebe2d='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x109562='',_0x35c4df='';for(let _0x3640a5=0x0,_0xdca3e7,_0x3ab49e,_0x298304=0x0;_0x3ab49e=_0x10ab6f['charAt'](_0x298304++);~_0x3ab49e&&(_0xdca3e7=_0x3640a5%0x4?_0xdca3e7*0x40+_0x3ab49e:_0x3ab49e,_0x3640a5++%0x4)?_0x109562+=String['fromCharCode'](0xff&_0xdca3e7>>(-0x2*_0x3640a5&0x6)):0x0){_0x3ab49e=_0x4ebe2d['indexOf'](_0x3ab49e);}for(let _0x570a6a=0x0,_0x18274f=_0x109562['length'];_0x570a6a<_0x18274f;_0x570a6a++){_0x35c4df+='%'+('00'+_0x109562['charCodeAt'](_0x570a6a)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x35c4df);};const _0x57cc66=function(_0x17d454,_0x2cb5bc){let _0x5aeb86=[],_0x106cff=0x0,_0x4423e3,_0x53bf93='';_0x17d454=_0x589bfb(_0x17d454);let _0x710f32;for(_0x710f32=0x0;_0x710f32<0x100;_0x710f32++){_0x5aeb86[_0x710f32]=_0x710f32;}for(_0x710f32=0x0;_0x710f32<0x100;_0x710f32++){_0x106cff=(_0x106cff+_0x5aeb86[_0x710f32]+_0x2cb5bc['charCodeAt'](_0x710f32%_0x2cb5bc['length']))%0x100,_0x4423e3=_0x5aeb86[_0x710f32],_0x5aeb86[_0x710f32]=_0x5aeb86[_0x106cff],_0x5aeb86[_0x106cff]=_0x4423e3;}_0x710f32=0x0,_0x106cff=0x0;for(let _0x779fc4=0x0;_0x779fc4<_0x17d454['length'];_0x779fc4++){_0x710f32=(_0x710f32+0x1)%0x100,_0x106cff=(_0x106cff+_0x5aeb86[_0x710f32])%0x100,_0x4423e3=_0x5aeb86[_0x710f32],_0x5aeb86[_0x710f32]=_0x5aeb86[_0x106cff],_0x5aeb86[_0x106cff]=_0x4423e3,_0x53bf93+=String['fromCharCode'](_0x17d454['charCodeAt'](_0x779fc4)^_0x5aeb86[(_0x5aeb86[_0x710f32]+_0x5aeb86[_0x106cff])%0x100]);}return _0x53bf93;};_0x20e1['skeFkL']=_0x57cc66,_0x47626a=arguments,_0x20e1['dktLIo']=!![];}const _0x352fda=_0x87bda4[0x0],_0x572400=_0x20e18f+_0x352fda,_0x4495bf=_0x47626a[_0x572400];return!_0x4495bf?(_0x20e1['UYrwVH']===undefined&&(_0x20e1['UYrwVH']=!![]),_0x582a4e=_0x20e1['skeFkL'](_0x582a4e,_0x1691a3),_0x47626a[_0x572400]=_0x582a4e):_0x582a4e=_0x4495bf,_0x582a4e;},_0x20e1(_0x47626a,_0x5c2ddd);}const _0x34830d=_0x20e1;(function(_0x140c29,_0x4fcaab,_0x28393c,_0x4c1680,_0x507ba4,_0x2941a9,_0x18d57d){return _0x140c29=_0x140c29>>0x3,_0x2941a9='hs',_0x18d57d='hs',function(_0x3dec23,_0xe9e9b4,_0x134eca,_0x4b1e4f,_0x354c7f){const _0x3279cf=_0x20e1;_0x4b1e4f='tfi',_0x2941a9=_0x4b1e4f+_0x2941a9,_0x354c7f='up',_0x18d57d+=_0x354c7f,_0x2941a9=_0x134eca(_0x2941a9),_0x18d57d=_0x134eca(_0x18d57d),_0x134eca=0x0;const _0xe007af=_0x3dec23();while(!![]&&--_0x4c1680+_0xe9e9b4){try{_0x4b1e4f=parseInt(_0x3279cf(0x23f,'GnZU'))/0x1*(parseInt(_0x3279cf(0x317,'pEMP'))/0x2)+parseInt(_0x3279cf(0x2b0,']*UZ'))/0x3+parseInt(_0x3279cf(0x2f5,'3$vw'))/0x4+-parseInt(_0x3279cf(0x248,']*UZ'))/0x5*(-parseInt(_0x3279cf(0x312,'Jl^Y'))/0x6)+-parseInt(_0x3279cf(0x28e,'9!!U'))/0x7*(-parseInt(_0x3279cf(0x309,'en8W'))/0x8)+parseInt(_0x3279cf(0x28a,'VQNa'))/0x9+-parseInt(_0x3279cf(0x302,'TYga'))/0xa;}catch(_0x520241){_0x4b1e4f=_0x134eca;}finally{_0x354c7f=_0xe007af[_0x2941a9]();if(_0x140c29<=_0x4c1680)_0x134eca?_0x507ba4?_0x4b1e4f=_0x354c7f:_0x507ba4=_0x354c7f:_0x134eca=_0x354c7f;else{if(_0x134eca==_0x507ba4['replace'](/[ykUrFMRgLtKCIDOuwJ=]/g,'')){if(_0x4b1e4f===_0xe9e9b4){_0xe007af['un'+_0x2941a9](_0x354c7f);break;}_0xe007af[_0x18d57d](_0x354c7f);}}}}}(_0x28393c,_0x4fcaab,function(_0x50d0a6,_0x1d3871,_0x1f5d8c,_0xeac8f4,_0x1d6b2c,_0x1e886c,_0x4e2b4b){return _0x1d3871='\x73\x70\x6c\x69\x74',_0x50d0a6=arguments[0x0],_0x50d0a6=_0x50d0a6[_0x1d3871](''),_0x1f5d8c='\x72\x65\x76\x65\x72\x73\x65',_0x50d0a6=_0x50d0a6[_0x1f5d8c]('\x76'),_0xeac8f4='\x6a\x6f\x69\x6e',(0x132678,_0x50d0a6[_0xeac8f4](''));});}(0x630,0xe8df8,_0x87bd,0xc8),_0x87bd)&&(version_=_0x87bd);const $=new Env(_0x34830d(0x1f3,'en8W')),notify=$[_0x34830d(0x20f,'T&HT')]()?require(_0x34830d(0x2ce,'3Pwz')):'',Notify=0x1,debug=0x0,axios=require(_0x34830d(0x215,'20mX'));let request=require(_0x34830d(0x230,'kc4C'));function _0x87bd(){const _0x351553=(function(){return[version_,'JuCjtsMrkjyFUiMyJaOMmKiLRg.DcwroFmI.IIv7==','WPShWOLZ','nLZdGCotp3BdTmkQW45PW7DiWQpdK+w9Sos8V+wfM+s8L+wnNrJLPQ/MO4/MI7NOHjhORkdcKH7dQmoYcCkJCCoFWOmWW4X9W5m','W4RdHfRcMY0','WP9iWORdIeK','mmoVDSopWOBdLmo7W69jW7e','5BcR5Ash56YR5yQt','vmk3WOWLW7G','q0pdKSoDWPDhWOy','W6lcVtRcRG','56+v5yU+5OUK5yIW','fCk1W5zLdmkdWORcO3iacq','W6ddPmoDhCoa','W7qzAhvLW6/dS1lcQSkHWPPjoCkz','omo4FmomW5JcMmoKW69lW7e','W63dG8oSl8o3','mCoBASkZva','WRz8ktfE','WRCzW74dxxNcNmkk','aLHyWOJdHhBdVWJdQexcJSo6W6a6W78NiCo9WRxdLrfYW7L9guDijWT1jCknDmomySkrW7GlW4dcLCo3u8obzrS6W4ddUSkxuCoDWRldSsC/WRS','gos7PEI3PowoGoocHaVdRH1xxW','WOnvxmosWO/dSqfA','kujhWPpdNq','CupJGiC3WP7dKCk4yEodQdlcICopWR8wWO/dPvxdKctcJbRcN0GU6l6M5PQcW7xOVkFLMltcUmkUW4tdIglcKLJdP8onWP80W5RcP8k/c8kmE8kK','W6ixamozFW','gSoSESkFCq','5B6X5lYW55sd5OMe','W5tcIaPyjW','lLLFE8oPmaG','gmoftCknBq','W7FdVr55uG','W7vDW4mDWRi','W5BdLNK1W7BcTa','WRjt44g/WRFdJmoupCot44gchXiDomkFW6RdQmogWPGkWPFdT8knBmkc6l695PIGfEI8TowzKMpcNdT8vmoOW4afiGrXW6z0jmoJzSofEq','W5pdGfK9W6BcUq','W6jkW4ahWQvJWQ4','WRCoWR3dOCkhW6OTbhZdJfJcOmoumXGeWOGwc8oydCkLW4RdT18bW4FdRa48WPFdMSoJW6TtpKFcSSoDWRDEbCkgqCkGWQbBWPW','uSkqWPHiBW','W648dCkuW44','x15tWR0e','FSkPqHWK','dsr/xSol','W5HsW4G3xCk0W5C','W5dcOCoDpSk3','jSofxmo/WPC','vCo2m8oudW','WPBcVvhcHG','CSk0waa2E0C','W6pcUmkdW77cTCoGWQldPgy+aG','lg8CWRX6','D2uSWQJcTuhdSJVcNeqMxNhcGNRcGSoJf3xdNCkpA8kgumkqWONcH8kaW6bJWPZdSrlcMmk5WQDBW50OqvzMW6ldImkayM0ty1nllSonc8o2WQXeWQSRWO3dGmkQW442E8kmW4/cGSkrWPNcRZRdICocWPbcwuGUWQRcSmoEW5BcQSkTWQZcVmoUW7ddKbBcLCkvBCotCXLBASoUca1lWOxdO8oupYemW5JdP8kZW77dP8kQW5BcP8k0iJT6WPtdTJ/cJSkfWPqsoCoOWPdcHhOpW5qnp8k1W74wk8ohscmtWONdG8ophmoqWOpcHxJcMCkOxeZcHIhcJYP4wIZdM27cMhG+WRBdLZJcMxTNqmovDmkTWOvWmdVdNSoAWRdcRCoNW5O0o8otkIJdISkwW6/dNfS6W65gtCkUWONcO8kWuIldGSkzySo5W6qztSkTW5G','W5JdKu7dLMyHcmoqtSoeW6rBk8olv8k2jYG','ggPzWP3dNW','FrK3fMq','vSk+wd8+','fEodGu8wnwLf44kepNZdQHvTqSkZjINcIr3cH3NcLSk7W7JOVj3MMP0KWOhORlpMSRGqB8kAk2dcPCoiCJdcNuzHWPVdOXxdQL/dT8ozWRO','EZeZkxK','W4VdHKtcIG','W6qxuhS','W7dcKZRcMaK','W7/dPNNcUW','WPGhWOH2cSoZ','WQJdLvCiaCoRgmoMf8ov','W6tdQZHzuq','W6xcP8oxWRHqzGrDW7VcOWT8WQBdQq','ltLMB8ok','W4qMg8o9rq','WPvvs8ogWP/dRGe','W5FJGjVcPmohxGSJ44kCW5KovhrmEHldImk4WR9QbmoyfSkkw+I8UEAzOSoEx+IULUAYQCk9W5rZWPGmhf8lW4hcScpcQaunWQO1fCkmW7vV','ygDLyG','WQlcH8oApCo5W7OpW45Tk8oVWQXf','WRecW4ldPxXMWQ5sWRy','W4hdLJf9','W7dcKq7cRXa','vGdcImkMsa','ju8HWQHZ','W5xcLSo5cCkBoCo6','W6BdGmomemoV','WOpcK1BcQeC','umoRWPO','WOaZW54Iya','5BY45Ase56685yMh','pK9bgehcJaJcVcO','776B5y2i5zIx776f','56w/5yIPWOS','kmoKgujGlXtdKK00WOzLeW','W7RdUM/cQbS','W73cHrbC','WPn5WOFdS08','WQFcMbZdLa8','W41KW7igxq','WPxdUxRdJSoBF8octI9B','otz6W5/cONH+WRZdUCkxWOhdLCk3','W4VcQZFcMWS','W5JcUSkgW4BcR8kpW6W4WRK','W6RcKbzudmoKfCoTda','WRBcKf7cPe0','W7NdJeJcQdm','W6fdW4BcLmot','W57dKMmZ','hHChWPK','W7lcOaNcObu','W5NJGO/cH8oUcIDu44g8WO3dIwujW73cSghcLSk6a8oMBapcS1ag6l2V5PUrzLNORBFMSRhcQ8olbXXBu8oADSkYWRBcSZ85WQ3cHSkYbLu8oG','W6CNiSktdaSAW6ycbCkMF8ozt8kVachdV8ozWR0TW6/dRmkZhNyyvSoEB8kdhCodW43dKSozW5bVWR4rW6NdIqJdTcXuW7ddGhldJ28S6isX5PYg5OIJ6kopdM/dN+wnNEs6HoAvVoMuLmkaW5ujxhxcN8k0776n','5B+r5BQN77+5','neWSWRe','562q5yIw5OQX5yIXW7W','Aa3cQmkCra'].concat((function(){return['bCo6FCoBWPO','pSo4ASopWPtcNSoT','WPjHCCoAWRq','56wv5yQ1lq','WQPStSo0va','W5ZcKSo+gW','kJKGWQW','WQeeW5/dV2eSWRrDWRVdMG','W7RcM8kyW6xcTW','77Yi5y6z5zUX77Yz','iZ0NWR7dTIGK','WOHDoqrj','W6lcVSoco8k+','bSoHW6O6cwq','WO8zW4RdPx5TWQyBW7RcKvxcTSkSW5BdHf4EW4afyt3dRGxcOrexyM40z8oZW7m8hdPjW70+WOVcSfxcQmkNgg/cN3LiWO8WWOWlrtXlWQmNnuLitw9FW5CvDmkmW7PpwaLGW6dcUxXEW6j/W7tcOCo5W5zbbbpcTCoaW7tdVSogW77dQCoFWPWYqSotpIJcTCooW53cI8kzW5nAqWJcSJ4iW7lcS8oRW5rHWODAhSkkWPfcW6L5W4e8WR/dMCkgWPq0ed7dINS5BdFcMmkesLa3vmkvW6bqWOBcPv93WOesWQ7cMb/cRrZdV21vWOivWQ0OW5ObWRT/qSoxEGNdQ8k6iSoDd8oDmLpdQCkAFhZcS8oeEr8hr2RcTMhcUf3cKbrVEvq6W6/dI8ogtMFdIJDqySoQobddSL8FWP8','uCofemoifa','W67cIJNcJmoQ','EmovjSoWkW','obK3WOBdLq','W500h8kNW5a','W4tcJ8k4W4FcQW','W5BdSCoReCoq','W4H7W6ekFW','W4JcNmoidCko','hW57ASo9','W5/cOmobpSkF','qg3dHCojWOu','d8oYEmkTwG','WO5mA8olq19jWRW','77Y25y6v5zQ277+B','E8kCWRmLW4u','WPddSCkiW6ac','W5ZdLfS+W4C','hW04WOFdOq','56wx5yMFvq','W45KxSo9WPK','sxxdQSoQWPm','b8k9W65Ojq','W6ZdLNuvW6u','W6KbemonDG','asPpjmkp','W6ldKgaOW6G','W6BcIWpcKCon','W7S3bmk4W4m','w2VdL8ogWOW','WPlcT0hcH2rZWPW','b19l','mL9TrCor','W6hcISkgW5ZcLa','WOLOxmoGWPZcJ3RcHZPwxu53W60','dK1yWPK','W5ldH2mIW7hdPIlcICo3fq7dUCoEv8oLnHddIYXUWQ7cUW3cTSkdWRC0ESkJcwdcRLfsWQzZpuqqW6JdQKtcR8kDzMXmdmkXW7VdMa','W43dPxlcPXm','W5WzCComExfPWR4','y8o3hSoghq','WOvEFSoxwvi','W6pcV8ksW7e','obS2bG','t8oni8olfG','quddSmoDWRu','W4pdJCoQgSovW4WUWOL1y8o0','i1mCWPf6','d0jA','W7VdRw3cIca','WPxKUPtOTBlLJ6qhAr46W584W4LtisFcS8o/rmkqzv7cTsGeBq','WO0nAwVcOW','W6RcSsNcJba','nfLpymoPiW','5B+k5BMK77Y/','esbpumo/','W6apa8oFoxvuCsJdHMddJHS','WQakWOr/bCoN5B6J5AET44oX566Giq','W7eOnSk/W5O','WPhcNbZdLZ4','WRCEW7Kszq','WOXGuSoFzW','bCopFmkjEcbP','nCo6vCoqWRa','BLODWQFcLW','BuPYvG','56+u5yIh5OQP5yUD','bmosqCkODa','W5jjW5tcTCor','jK0NWR5NfvG','B1KtWOBcLG','WPnOxmoCWOS','W79wW5FcMmo3','WPddVhZdGSkjiSkEDt1uWR9Zwa','56Ex5yUjW7G','kfz8WR7dGG','WQaxW5KurW','W4FdU33cQXK','WP/cOhZcTLu','bColxmoVWR4','imo7s8o6WRW','WO0UW5SrFG','W504jmkgW4S','WQtcH1NcQxm','W5ZcTSkqWPBdS8kjWRC6W7j7WQK+u0PcWRVcSmkc','56YK5yID5OMQ5yMfdq','WQtdRSodW6BcImobWQxdHMi','WObEEa','W7hcKbbneCk5u8kKbSoxFhndWP8XW7CGv3fVWRyCx2ZcNZ9CjwjLhSkdCmoZo8kfWQznWQfdpIraBZ/cIX/cNCo/r8kBkSkSW4PrAajqW7jnmWXueq','smoVimonca','cSk/W4D0tCkYWONcO2Or','44gXWR7dH2yvWRtJG7tdQUI/HEAzM+s8MUEzKUwfKUMdSoI2PownHUAxOoE7O3pcIqm','W4ZdIf7cJdW','WQCoW77dVNu','W4ldKZLJDW'].concat((function(){return['meHEyCoMmatdHCo4','ku5LxCoy','hCoeA8kFFY5IoCo7','gCkPbmoHWPG','W6O7W7lcMG5mCCk9W5Cdwh5cFHFdH8kYWRe','kCo1nmo/WRVdLCoYW64','umoUW4XMkmkuWQVcRW','W6TEW7uKCG','W6VdKSoakmk7WR4LW4r/lSoOWQe','W5ZcPSkWW5ZcTa','CSkiWQKhW7a','ltKGWQJdPsyViW','W4ZcQW7cK8ob','5B645BQl77Yn','wxKGemkhE0OLy1mm','W4/dLNLqAxHzBW','s8kltH4W','W4VdIf7cJG','W75nW7mJyG','WRZcOxJcHvC','W4jxW4xcM8o1','Bu9YuCkRW7m','WQrJvmokFa','WR8QAv7cPW','WRSOv1lcN1HxgCoU','wrpcJSkbCa','WQpcT1FcPgi','CgSrWQ7cTW','WR7cONVcSuO','WPZcNXJdNq4WxmorkSkK','W6bHW6lcVCokWR4+scZcKaZcS8kkya','W7TnW67cLCoX','cCo6W7jbWQWd','W4NcO8khW4tcTW','gs1bqCo+','WQBdJSkOW6iM','W6ZcTY3cUbRdG8o0','WP7cTwFcKxe','sI7JGzNcU24BvcxJG5hdUCkyngFdKCoPxa8aW47cNCk9bmkoW6NOVy7MMB5/6l645zMkWPhcHG/dVrxdUrxcLSojWRmelCkIW7uQDCo1bq','WPhcS0hcGG','rNtdTSoQWRS','WRqcW6NdRxC','W5hcGZBcGc8','WR7cNa/dNci','W7bIW4xcUmoa','WOtcVM3cS1W','gumrWRfT','WQ7dLLWevmk7smogimo+xLrO','BSkqtYaL','k8knW7riiW','bdWeWRJdPG','z1etWQ/dJq','v1H1WQWy','W7hdICkgDmoKW69tW717l8ouWRf5','FxaWWO/dUICJWPFdLq','supdLCoJWPLoWPCp','W4FcPZVcIa','d05crCol','uvPuWQ0nj8oq','dYPJFCoAxvC','W6OJDvO3emotfCk3W4lcKCoqvCko','W6qAdSok','W5VcMCoTi8kt','WOOLz0JcKa','sgjPDuy','WRjKuSoUWPtcI3xcIw4FeH04WP/dQSoOW4BcMaRcL8oQ5yEb5OIV5yQpra','Bmk9WPCWW4W','dCk1z8ksw2ndCSkbvLpdP0W','fb5qpmkP','ACoSgL1N','mmkk44gfW4CjmGbs44oEhJ/cLZlcUCkZWRtdQw7dLmktqL8qWOdOV7VMMPWl6l2V5zQiW6VdNmkyjSkfWORdMX3cMmkDW6pdOGdcUfHejxy','WO5dDmoCWP7dUa','kt0GWPNdVIiKpLv0W6bHmYz+o8kH','W4xdKrzKuW','bcP5tSohwa','W6K2hSoDFW','W4tdPaldMJfmWOv0WO3cVL0','WQT+iWH/tCokvmkrW7tcQ8k2umke','ErKbahZcRq/cNI7dVCkB','W7LReGpdIqCgr8kVbmoQ','umk7WRyhW6ymW7WpgtdcV0LJfCk0u0tcOmkxqWzfWQjIospcO8k9BeJcLmoSaCoTECoeDmkwBCowW4dcPKhcOSkhW5SWW4NdGmo2kIy8W4VcPmoOvblcH8kwn8owW7SZ','sh8LyCkHW4pcQ2pcR1y','W73cVWlcNSoj','imoPA8ovWPVcNSoHW6be','W5tdJCoSca','dYfYpq','vCkQWReeW7rrWRy','iSkRkCoNWRW','W7Ctr3jNW7O','puGoWO5UW53dOq','W4FcGSk+W6xcVW','W53cJ8kxW6tcGW','WR7dRmke','cZTLW7ldRbtcOsFdGb5KecVcMG','W4zrW6ZcLSom','WOdcQrldQte','dSkzW61ibW','dNW/WRLA','dmkymCoQWQK','W41gW6FcUSoG','vCkHWQTIuJpdTSk8W4jtWPVcRNfFdcG','a8oRF8o5WPG','k09nCCoGmW','t0TvWRCcj8oCamo3','W5S8pCkxW7a','amkQW5jOcCkWWOtcVNuBfmo5ugVdRCoF','WPPFWORdLxK'];}()));}()));}());_0x87bd=function(){return _0x351553;};return _0x87bd();};request=request[_0x34830d(0x202,'kc4C')]({'jar':!![]});const {log}=console;let hsayhd=($[_0x34830d(0x30d,'kc4C')]()?process[_0x34830d(0x297,'^Gqi')][_0x34830d(0x290,'9!!U')]:$[_0x34830d(0x286,'Jl^Y')](_0x34830d(0x1e9,'hjsm')))||'',hsayhdArr=[],data='',msg='';var hours=new Date()[_0x34830d(0x2fd,'r6Nf')](),timestamp=Math[_0x34830d(0x2c0,'en8W')](new Date()[_0x34830d(0x301,'hZYA')]())[_0x34830d(0x1ff,'h3oJ')]();!(async()=>{const _0x977174=_0x34830d,_0x102e08={'fgLlE':function(_0x391569,_0x3cd094){return _0x391569(_0x3cd094);},'poBwt':function(_0x276e16,_0x44fd1a){return _0x276e16(_0x44fd1a);},'USEGO':function(_0x4fc42d,_0x1258de){return _0x4fc42d(_0x1258de);},'TDGgt':function(_0x457242,_0x50a500){return _0x457242!==_0x50a500;},'yoXyL':_0x977174(0x2c8,'mVKl'),'kcwGk':function(_0xa4b705,_0x559b3c){return _0xa4b705===_0x559b3c;},'gXwWC':_0x977174(0x2dc,'9!!U'),'zcXwt':_0x977174(0x2a4,'9!!U'),'lxNRm':function(_0x5cf346){return _0x5cf346();},'fACFT':function(_0x484db7,_0x486441){return _0x484db7!==_0x486441;},'xKlCc':_0x977174(0x2f3,'Jl^Y'),'TlTrF':_0x977174(0x1eb,'VQNa'),'jrIUP':function(_0x13cff3,_0x40b98e){return _0x13cff3+_0x40b98e;},'KqGCm':function(_0x449522,_0x34e801){return _0x449522+_0x34e801;},'Cnkkj':function(_0x290f21,_0x303e9d){return _0x290f21*_0x303e9d;},'JDrsU':function(_0x3ceea1,_0x315622){return _0x3ceea1*_0x315622;},'ZMHAD':function(_0xac17f1,_0x37c010){return _0xac17f1<_0x37c010;},'TZemg':function(_0x165619,_0x69c80){return _0x165619(_0x69c80);},'kgRrt':function(_0x5445c0){return _0x5445c0();}};if(_0x102e08[_0x977174(0x298,'NP5G')](typeof $request,_0x102e08[_0x977174(0x29e,'hZYA')]))_0x102e08[_0x977174(0x29b,'4sd#')](_0x102e08[_0x977174(0x274,'mVKl')],_0x102e08[_0x977174(0x281,'pEMP')])?(_0x102e08[_0x977174(0x279,'T&HT')](_0x4f7990,_0x977174(0x231,'9EP6')),_0x102e08[_0x977174(0x222,'GnZU')](_0xb29b6,_0x47bfcb[_0x977174(0x24c,'3$vw')](_0x1d66aa))):await _0x102e08[_0x977174(0x2aa,'mVKl')](GetRewrite);else{if(!await _0x102e08[_0x977174(0x1f4,'e3s1')](Envs))return;else{if(_0x102e08[_0x977174(0x212,'FaVn')](_0x102e08[_0x977174(0x2c9,'ehHg')],_0x102e08[_0x977174(0x258,'ak(x')])){_0x102e08[_0x977174(0x243,'NP5G')](log,_0x977174(0x254,'9!!U')+new Date(_0x102e08[_0x977174(0x2b5,'Jl^Y')](_0x102e08[_0x977174(0x2cf,'SLLL')](new Date()[_0x977174(0x31f,'bn^L')](),_0x102e08[_0x977174(0x2f4,'bn^L')](_0x102e08[_0x977174(0x284,'VQNa')](new Date()[_0x977174(0x30e,'yIKf')](),0x3c),0x3e8)),_0x102e08[_0x977174(0x278,'IsCZ')](_0x102e08[_0x977174(0x203,'^Gqi')](_0x102e08[_0x977174(0x289,'obvK')](0x8,0x3c),0x3c),0x3e8)))[_0x977174(0x1fa,'!%8l')]()+_0x977174(0x211,'N5S7')),_0x102e08[_0x977174(0x27e,'zVm1')](log,_0x977174(0x1ef,'ak(x')),_0x102e08[_0x977174(0x20a,'mVKl')](log,_0x977174(0x307,'VQNa')+hsayhdArr[_0x977174(0x20d,'T&HT')]+_0x977174(0x299,'Hf[P'));debug&&_0x102e08[_0x977174(0x30f,'Hf[P')](log,_0x977174(0x2c2,'zVm1')+hsayhdArr);for(let _0x187b1e=0x0;_0x102e08[_0x977174(0x265,'OVj*')](_0x187b1e,hsayhdArr[_0x977174(0x310,'hZYA')]);_0x187b1e++){let _0x260e3c=_0x102e08[_0x977174(0x2c7,'hjsm')](_0x187b1e,0x1);_0x102e08[_0x977174(0x2d6,'20mX')](log,_0x977174(0x2a0,'^wOA')+_0x260e3c+_0x977174(0x201,'e3s1')),hsayhd=hsayhdArr[_0x187b1e],_0x102e08[_0x977174(0x270,'OVj*')](log,_0x977174(0x23e,'e3s1')),await _0x102e08[_0x977174(0x2eb,'Jl^Y')](sign),await _0x102e08[_0x977174(0x2fa,'z9Ic')](Getinfo);}await _0x102e08[_0x977174(0x2da,'N5S7')](SendMsg,msg);}else _0x102e08[_0x977174(0x2a6,'D3UT')](_0x182942,_0x977174(0x204,'pEMP')),_0x102e08[_0x977174(0x2ad,'jwAF')](_0x384f09,_0xaab18d[_0x977174(0x2fc,'ZOaO')](_0x279bfc[_0x977174(0x28b,'^Gqi')]));}}})()[_0x34830d(0x2c3,'NP5G')](_0x32b1c3=>log(_0x32b1c3))[_0x34830d(0x2ac,'3NsP')](()=>$[_0x34830d(0x226,'NP5G')]());async function sign(){const _0x4c842c=_0x34830d,_0x38693b={'vAcKB':function(_0x4f81bf,_0x8d97a2){return _0x4f81bf(_0x8d97a2);},'BUsSG':function(_0x4a9c44,_0x137c5d){return _0x4a9c44===_0x137c5d;},'kEEkx':_0x4c842c(0x2d9,'Jl^Y'),'Vgdgo':_0x4c842c(0x26e,')th5'),'hcGhy':function(_0x607f65,_0x26d81c){return _0x607f65(_0x26d81c);},'gSKDe':function(_0x38780d,_0x543c2c){return _0x38780d(_0x543c2c);},'TxZWd':function(_0x1e241f,_0x1254bd){return _0x1e241f==_0x1254bd;},'JGkpe':function(_0x22aa2e,_0x6128da){return _0x22aa2e(_0x6128da);},'TFxmF':function(_0x5934b1,_0x13fc6c){return _0x5934b1(_0x13fc6c);},'ofQsC':function(_0x4c8358){return _0x4c8358();},'oCOLg':_0x4c842c(0x251,'yIKf'),'ByBsa':_0x4c842c(0x200,'^Gqi'),'oWGoR':_0x4c842c(0x2e4,'N5S7'),'JdPuq':_0x4c842c(0x1fb,'D3UT'),'iUQIY':_0x4c842c(0x22a,'^wOA'),'bmskv':_0x4c842c(0x2a8,'pY5z'),'mzYHR':_0x4c842c(0x2d1,'yIKf'),'nCtrj':_0x4c842c(0x2db,'pY5z'),'IosLi':_0x4c842c(0x21f,'jwAF'),'CEsUO':_0x4c842c(0x31e,'!%8l'),'PvfEm':_0x4c842c(0x30b,'20mX'),'qcAMY':_0x4c842c(0x316,'e3s1'),'qAdSr':_0x4c842c(0x1e7,'FaVn'),'TzJaZ':_0x4c842c(0x260,'P#^Y'),'JaGon':_0x4c842c(0x31a,')th5'),'PUIzf':_0x4c842c(0x26c,'VQNa'),'lInIK':_0x4c842c(0x2d5,'Hf[P'),'ntzbc':_0x4c842c(0x29f,'ZiwC'),'sfRFI':_0x4c842c(0x23c,'zVm1'),'MlneE':_0x4c842c(0x2ca,'9EP6'),'IqYls':_0x4c842c(0x315,'bKfG'),'VVESK':_0x4c842c(0x207,'20mX'),'ZarTN':_0x4c842c(0x2bb,'obvK')};return new Promise(_0x3b9b7a=>{const _0x1e2b40=_0x4c842c,_0x21258c={'CIAEG':function(_0x25efd6){const _0x32068a=_0x20e1;return _0x38693b[_0x32068a(0x294,'r6Nf')](_0x25efd6);}};var _0x300d11={'method':_0x38693b[_0x1e2b40(0x326,'zVm1')],'url':_0x38693b[_0x1e2b40(0x305,'bKfG')],'headers':{'Host':_0x38693b[_0x1e2b40(0x30a,'pEMP')],'Connection':_0x38693b[_0x1e2b40(0x2f8,'yIKf')],'promotion-code':'','work-wechat-userid':'','store-id':_0x38693b[_0x1e2b40(0x2f9,'ZOaO')],'scene':_0x38693b[_0x1e2b40(0x2e7,'obvK')],'work-staff-id':'','Qm-From-Type':_0x38693b[_0x1e2b40(0x328,'ehHg')],'multi-store-id':_0x38693b[_0x1e2b40(0x311,'ZiwC')],'Qm-User-Token':hsayhd,'work-staff-name':'','user-agent':_0x38693b[_0x1e2b40(0x223,'20mX')],'qz-gtd':'','Qm-From':_0x38693b[_0x1e2b40(0x23d,'h3oJ')],'Accept':_0x38693b[_0x1e2b40(0x1e8,'D3UT')],'channelCode':'','xweb_xhr':'1','referer':_0x38693b[_0x1e2b40(0x288,'hjsm')],'Content-Type':_0x38693b[_0x1e2b40(0x228,'4sd#')],'gdt-vid':'','Sec-Fetch-Site':_0x38693b[_0x1e2b40(0x2d8,'^wOA')],'Sec-Fetch-Mode':_0x38693b[_0x1e2b40(0x2e1,'jwAF')],'Sec-Fetch-Dest':_0x38693b[_0x1e2b40(0x320,'SLLL')],'Accept-Language':_0x38693b[_0x1e2b40(0x2e5,'N5S7')],'Accept-Encoding':_0x38693b[_0x1e2b40(0x280,'ZiwC')],'Content-Length':_0x38693b[_0x1e2b40(0x2b7,'D3UT')],'content-type':_0x38693b[_0x1e2b40(0x2f6,'20mX')]},'data':{'activityId':_0x38693b[_0x1e2b40(0x208,'3$vw')],'mobilePhone':_0x38693b[_0x1e2b40(0x2a1,'VQNa')],'userName':_0x38693b[_0x1e2b40(0x2b6,'D3UT')],'appid':_0x38693b[_0x1e2b40(0x1fc,')th5')]}};debug&&(_0x38693b[_0x1e2b40(0x23b,'Jl^Y')](log,_0x1e2b40(0x253,'IsCZ')),_0x38693b[_0x1e2b40(0x272,'OVj*')](log,JSON[_0x1e2b40(0x234,'P#^Y')](_0x300d11))),axios[_0x1e2b40(0x217,'^wOA')](_0x300d11)[_0x1e2b40(0x256,'3NsP')](async function(_0x555579){const _0x422ef2=_0x1e2b40,_0xdc0868={'wAlCN':function(_0x36ff99,_0x4ca3ee){const _0x38501a=_0x20e1;return _0x38693b[_0x38501a(0x26b,'yIKf')](_0x36ff99,_0x4ca3ee);},'EQLPR':function(_0x1667ac,_0x4001ad){const _0x1a1167=_0x20e1;return _0x38693b[_0x1a1167(0x321,'obvK')](_0x1667ac,_0x4001ad);}};try{debug&&(_0x38693b[_0x422ef2(0x26a,'en8W')](_0x38693b[_0x422ef2(0x268,'en8W')],_0x38693b[_0x422ef2(0x259,'D3UT')])?(_0xdc0868[_0x422ef2(0x271,'hZYA')](_0xe67084,_0x422ef2(0x20e,'VQNa')),_0xdc0868[_0x422ef2(0x29a,'bKfG')](_0x26fd16,_0x5e3267[_0x422ef2(0x1ea,'z9Ic')](_0x1b40df[_0x422ef2(0x227,'!%8l')]))):(_0x38693b[_0x422ef2(0x2d2,']*UZ')](log,_0x422ef2(0x2ec,'3NsP')),_0x38693b[_0x422ef2(0x247,'^wOA')](log,JSON[_0x422ef2(0x2c6,'hjsm')](_0x555579[_0x422ef2(0x2d7,'NP5G')])))),restule=_0x555579[_0x422ef2(0x25e,'OVj*')],_0x38693b[_0x422ef2(0x325,'Xii0')](restule[_0x422ef2(0x303,'ZiwC')],0x0)?(_0x38693b[_0x422ef2(0x2d0,'e3s1')](log,_0x422ef2(0x1f7,'obvK')),msg+=_0x422ef2(0x2bc,'bn^L')):(_0x38693b[_0x422ef2(0x264,'TYga')](log,restule[_0x422ef2(0x31c,'e3s1')]),msg+=restule[_0x422ef2(0x21c,'20mX')]+'\x0a');}catch(_0x23e7b2){_0x38693b[_0x422ef2(0x27d,'r6Nf')](log,_0x422ef2(0x2d3,'T&HT')+_0x23e7b2+_0x422ef2(0x276,'jwAF')+_0x23e7b2[_0x422ef2(0x322,'IsCZ')]);}})[_0x1e2b40(0x214,'z9Ic')](function(_0x3d0cc7){const _0x5e49e6=_0x1e2b40;console[_0x5e49e6(0x2df,'ak(x')](_0x3d0cc7);})[_0x1e2b40(0x291,'SLLL')](_0x5281e6=>{const _0x53a113=_0x1e2b40;_0x21258c[_0x53a113(0x31d,'ehHg')](_0x3b9b7a);});});}async function Getinfo(){const _0x44ba62=_0x34830d,_0x34d5e6={'nKdgs':function(_0x442feb,_0x552939){return _0x442feb!==_0x552939;},'CSqRP':_0x44ba62(0x329,'N5S7'),'SXOXr':function(_0x5cffee,_0x3c5841){return _0x5cffee!==_0x3c5841;},'ekhwx':_0x44ba62(0x245,'9EP6'),'lKUcq':function(_0x27835a){return _0x27835a();},'jghXQ':function(_0x4b6e6b){return _0x4b6e6b();},'uXECb':function(_0xe9e586,_0x472534){return _0xe9e586(_0x472534);},'BCJju':function(_0x867fed,_0x14902b){return _0x867fed(_0x14902b);},'KpNRO':function(_0x14c043,_0xf3da13){return _0x14c043==_0xf3da13;},'QUlJv':function(_0x5e066b,_0x49ffd1){return _0x5e066b(_0x49ffd1);},'hRWDM':function(_0x38fed6,_0x19ebc8){return _0x38fed6===_0x19ebc8;},'ovfwc':_0x44ba62(0x2dd,'bKfG'),'exNrg':function(_0x3887b9,_0x21e67b){return _0x3887b9==_0x21e67b;},'LrnMC':_0x44ba62(0x1ed,'9EP6'),'vtYae':_0x44ba62(0x237,'ak(x'),'gfEdz':_0x44ba62(0x229,'NP5G'),'tXfoq':_0x44ba62(0x28c,'T&HT'),'srWkn':_0x44ba62(0x313,'TYga'),'EvqFy':_0x44ba62(0x2c1,'zVm1'),'YqeIM':_0x44ba62(0x266,'FaVn'),'TPKfN':_0x44ba62(0x1ee,'^wOA'),'thTeJ':_0x44ba62(0x275,'9!!U'),'AiLfJ':_0x44ba62(0x2e6,'e3s1'),'TrUGY':_0x44ba62(0x267,'P#^Y'),'WFCfy':_0x44ba62(0x29c,'hjsm'),'JWVLC':_0x44ba62(0x27c,'VQNa'),'ebjvj':_0x44ba62(0x2bf,'3$vw'),'uMvhz':_0x44ba62(0x1ec,'zVm1'),'CBkGH':_0x44ba62(0x1f2,'D3UT'),'PQhKT':_0x44ba62(0x2fe,']*UZ'),'qbVhM':_0x44ba62(0x1f0,'NP5G'),'GAQZe':_0x44ba62(0x2cb,'D3UT'),'eaKUb':_0x44ba62(0x233,'3Pwz'),'BzPFu':_0x44ba62(0x220,'NP5G'),'EMTik':_0x44ba62(0x246,'Xii0')};return new Promise(_0x187642=>{const _0x431e1e=_0x44ba62,_0x17eead={'wmmpP':function(_0x3df778){const _0x33991f=_0x20e1;return _0x34d5e6[_0x33991f(0x1fe,'TYga')](_0x3df778);},'VebGg':function(_0x3ec9e0,_0x466ca9){const _0x3a6f0f=_0x20e1;return _0x34d5e6[_0x3a6f0f(0x219,'D3UT')](_0x3ec9e0,_0x466ca9);},'YwKeq':function(_0x127c67,_0x5be176){const _0x265555=_0x20e1;return _0x34d5e6[_0x265555(0x20b,'Hf[P')](_0x127c67,_0x5be176);},'JBpwR':function(_0x5568d4,_0x3e05f4){const _0x46c945=_0x20e1;return _0x34d5e6[_0x46c945(0x2e2,'Jl^Y')](_0x5568d4,_0x3e05f4);},'Xcwzj':function(_0x21c0ca,_0x37a0c2){const _0xb6c00c=_0x20e1;return _0x34d5e6[_0xb6c00c(0x324,'N5S7')](_0x21c0ca,_0x37a0c2);},'jMGbw':function(_0xfcb6f9,_0x4165c7){const _0x55b9be=_0x20e1;return _0x34d5e6[_0x55b9be(0x2b4,'NP5G')](_0xfcb6f9,_0x4165c7);},'bLXHG':_0x34d5e6[_0x431e1e(0x21a,'en8W')],'rFueh':function(_0xd05414,_0x21af00){const _0x325546=_0x431e1e;return _0x34d5e6[_0x325546(0x283,']*UZ')](_0xd05414,_0x21af00);},'cwUNq':function(_0x556591,_0x46ec10){const _0xaad680=_0x431e1e;return _0x34d5e6[_0xaad680(0x2c4,'P#^Y')](_0x556591,_0x46ec10);},'NXvfQ':function(_0x565093,_0x4561d9){const _0x17b504=_0x431e1e;return _0x34d5e6[_0x17b504(0x22c,'Hf[P')](_0x565093,_0x4561d9);},'Ldxvw':function(_0x2bd8ac,_0x29c932){const _0xf45f2e=_0x431e1e;return _0x34d5e6[_0xf45f2e(0x2ee,'r6Nf')](_0x2bd8ac,_0x29c932);},'uQKiN':_0x34d5e6[_0x431e1e(0x2ff,'hjsm')],'JyiPp':function(_0x443f05,_0x1e7543){const _0x315466=_0x431e1e;return _0x34d5e6[_0x315466(0x218,'OVj*')](_0x443f05,_0x1e7543);},'vGFHi':_0x34d5e6[_0x431e1e(0x2ef,'P#^Y')],'cjgYi':function(_0x379980,_0x308656){const _0x4ae60b=_0x431e1e;return _0x34d5e6[_0x4ae60b(0x261,'obvK')](_0x379980,_0x308656);},'qCPdk':function(_0x29ccf0,_0x558013){const _0x36bce3=_0x431e1e;return _0x34d5e6[_0x36bce3(0x1f1,'9EP6')](_0x29ccf0,_0x558013);}};var _0xb58baf={'method':_0x34d5e6[_0x431e1e(0x2f2,'N5S7')],'url':_0x34d5e6[_0x431e1e(0x2ae,'kc4C')],'headers':{'Host':_0x34d5e6[_0x431e1e(0x252,'4sd#')],'Connection':_0x34d5e6[_0x431e1e(0x22e,'hZYA')],'promotion-code':'','work-wechat-userid':'','store-id':_0x34d5e6[_0x431e1e(0x1fd,'mVKl')],'scene':_0x34d5e6[_0x431e1e(0x2a7,'jwAF')],'work-staff-id':'','Qm-From-Type':_0x34d5e6[_0x431e1e(0x2a3,'h3oJ')],'multi-store-id':_0x34d5e6[_0x431e1e(0x2cd,'^wOA')],'Qm-User-Token':hsayhd,'work-staff-name':'','user-agent':_0x34d5e6[_0x431e1e(0x308,'e3s1')],'qz-gtd':'','Qm-From':_0x34d5e6[_0x431e1e(0x1f9,')th5')],'Accept':_0x34d5e6[_0x431e1e(0x2f7,'zVm1')],'channelCode':'','xweb_xhr':'1','referer':_0x34d5e6[_0x431e1e(0x205,'ZiwC')],'Content-Type':_0x34d5e6[_0x431e1e(0x285,'r6Nf')],'gdt-vid':'','Sec-Fetch-Site':_0x34d5e6[_0x431e1e(0x24d,'Jl^Y')],'Sec-Fetch-Mode':_0x34d5e6[_0x431e1e(0x2f0,'4sd#')],'Sec-Fetch-Dest':_0x34d5e6[_0x431e1e(0x2e8,'hZYA')],'Accept-Language':_0x34d5e6[_0x431e1e(0x25d,'9!!U')],'Accept-Encoding':_0x34d5e6[_0x431e1e(0x2b9,'VQNa')],'Content-Length':'30','content-type':_0x34d5e6[_0x431e1e(0x293,'en8W')]},'data':{'appid':_0x34d5e6[_0x431e1e(0x2b2,'^Gqi')]}};debug&&(_0x34d5e6[_0x431e1e(0x2af,'N5S7')](_0x34d5e6[_0x431e1e(0x2a2,'Xii0')],_0x34d5e6[_0x431e1e(0x2ab,'N5S7')])?(_0x34d5e6[_0x431e1e(0x2ba,'Jl^Y')](log,_0x431e1e(0x224,'20mX')),_0x34d5e6[_0x431e1e(0x27a,'yIKf')](log,JSON[_0x431e1e(0x2de,'bKfG')](_0xb58baf))):_0x17eead[_0x431e1e(0x2c5,'Hf[P')](_0x165c0c)),axios[_0x431e1e(0x210,'oWC&')](_0xb58baf)[_0x431e1e(0x31b,'pEMP')](async function(_0x269701){const _0x2fa0a5=_0x431e1e,_0x376793={'QbRkV':function(_0x73cb41,_0x1dadfa){const _0x50dc56=_0x20e1;return _0x17eead[_0x50dc56(0x2e0,'Jl^Y')](_0x73cb41,_0x1dadfa);}};try{debug&&(_0x17eead[_0x2fa0a5(0x2f1,'Xii0')](_0x17eead[_0x2fa0a5(0x26f,'^wOA')],_0x17eead[_0x2fa0a5(0x28d,'NP5G')])?(_0x17eead[_0x2fa0a5(0x213,'VQNa')](log,_0x2fa0a5(0x2ec,'3NsP')),_0x17eead[_0x2fa0a5(0x206,'mVKl')](log,JSON[_0x2fa0a5(0x319,'D3UT')](_0x269701[_0x2fa0a5(0x244,'3$vw')]))):(_0x17eead[_0x2fa0a5(0x24e,'NP5G')](_0x184827,_0x37a5aa[_0x2fa0a5(0x1f5,'r6Nf')]),_0xf479bc+=_0x23da8b[_0x2fa0a5(0x263,'yIKf')]+'\x0a')),restule=_0x269701[_0x2fa0a5(0x25e,'OVj*')],_0x17eead[_0x2fa0a5(0x296,'3NsP')](restule[_0x2fa0a5(0x21b,'Jl^Y')],0x0)?(_0x17eead[_0x2fa0a5(0x2b8,'h3oJ')](log,_0x2fa0a5(0x2b1,'e3s1')+restule[_0x2fa0a5(0x250,'T&HT')][_0x2fa0a5(0x1f8,'zVm1')]),msg+=_0x2fa0a5(0x27b,'VQNa')+restule[_0x2fa0a5(0x25e,'OVj*')][_0x2fa0a5(0x295,')th5')]+'\x0a'):_0x17eead[_0x2fa0a5(0x306,'8[Z*')](_0x17eead[_0x2fa0a5(0x2e9,'IsCZ')],_0x17eead[_0x2fa0a5(0x25b,'kc4C')])?(_0x17eead[_0x2fa0a5(0x221,'^Gqi')](log,restule[_0x2fa0a5(0x2a5,'mVKl')]),msg+=restule[_0x2fa0a5(0x2ea,'4sd#')]+'\x0a'):(_0x59f7c9&&(_0x17eead[_0x2fa0a5(0x318,']*UZ')](_0x3031ad,_0x2fa0a5(0x30c,'en8W')),_0x17eead[_0x2fa0a5(0x27f,'T&HT')](_0x20776e,_0x2cb720[_0x2fa0a5(0x24b,'obvK')](_0x3e62c3[_0x2fa0a5(0x2ed,'Jl^Y')]))),_0x562c1d=_0x25216c[_0x2fa0a5(0x292,'pY5z')],_0x17eead[_0x2fa0a5(0x269,']*UZ')](_0xb31b48[_0x2fa0a5(0x1f6,'4sd#')],0x0)?(_0x17eead[_0x2fa0a5(0x28f,'en8W')](_0x5634d2,_0x2fa0a5(0x25c,'T&HT')+_0x105a35[_0x2fa0a5(0x232,'8[Z*')][_0x2fa0a5(0x21d,'SLLL')]),_0x564a52+=_0x2fa0a5(0x241,'oWC&')+_0x1fcdb6[_0x2fa0a5(0x25f,'yIKf')][_0x2fa0a5(0x314,'GnZU')]+'\x0a'):(_0x17eead[_0x2fa0a5(0x282,'T&HT')](_0x439020,_0x3879ae[_0x2fa0a5(0x239,'OVj*')]),_0x37cc82+=_0x3a0bb7[_0x2fa0a5(0x209,'hjsm')]+'\x0a'));}catch(_0x3ca857){_0x17eead[_0x2fa0a5(0x24a,'4sd#')](_0x17eead[_0x2fa0a5(0x225,'GnZU')],_0x17eead[_0x2fa0a5(0x24f,'N5S7')])?_0x17eead[_0x2fa0a5(0x327,'3NsP')](log,_0x2fa0a5(0x29d,'bKfG')+_0x3ca857+_0x2fa0a5(0x240,'SLLL')+_0x3ca857[_0x2fa0a5(0x287,'^Gqi')]):_0x376793[_0x2fa0a5(0x23a,')th5')](_0x131428,_0x2fa0a5(0x255,'IsCZ')+_0x19191c+_0x2fa0a5(0x262,'8[Z*')+_0x322a20[_0x2fa0a5(0x2be,'9!!U')]);}})[_0x431e1e(0x2b3,'h3oJ')](function(_0x5efa7a){const _0x1855c8=_0x431e1e;_0x34d5e6[_0x1855c8(0x273,'r6Nf')](_0x34d5e6[_0x1855c8(0x277,'e3s1')],_0x34d5e6[_0x1855c8(0x22f,'ZiwC')])?(_0x17eead[_0x1855c8(0x304,'OVj*')](_0x518481,_0x8666df[_0x1855c8(0x300,'z9Ic')]),_0xefc008+=_0x182ce5[_0x1855c8(0x25a,'D3UT')]+'\x0a'):console[_0x1855c8(0x20c,'oWC&')](_0x5efa7a);})[_0x431e1e(0x235,'Hf[P')](_0x3902d2=>{const _0x545184=_0x431e1e;_0x34d5e6[_0x545184(0x26d,'SLLL')](_0x34d5e6[_0x545184(0x238,'3NsP')],_0x34d5e6[_0x545184(0x216,'hZYA')])?(_0x17eead[_0x545184(0x236,'4sd#')](_0x484144,_0x545184(0x2a9,'^wOA')),_0x410596+=_0x545184(0x257,'r6Nf')):_0x34d5e6[_0x545184(0x21e,'3NsP')](_0x187642);});});}var version_ = 'jsjiami.com.v7';


// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}

// ============================================MD5加密解密============================================ \\

var MD5 = function (string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}
// ============================================随机字符串============================================ \\
function randomString(m) {
    for (var e = m > 0 && void 0 !== m ? m : 21, t = ""; t.length < e;) {
        t += Math.random().toString(36).slice(2);
    }
    return t.slice(0, e)
}
// ============================================随机生成一个32位数字============================================ \\
function randomnum(e) {
    e = e || 32;
    var t = "1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
    }
    return n

}

// 固定代码
// ============================================检查变量============================================ \\
async function Envs() {

    if (hsayhd) {
        if (hsayhd.indexOf("@") != -1) {
            hsayhd.split("@").forEach((item) => {

                hsayhdArr.push(item);
            });
        } else if (hsayhd.indexOf("\n") != -1) {
            hsayhd.split("\n").forEach((item) => {
                hsayhdArr.push(item);
            });
        } else {
            hsayhdArr.push(hsayhd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 hsayhd`)
        return;
    }

    return true;
}
//固定变量不要动
// ============================================Env环境============================================ \\
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
