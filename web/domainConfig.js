define(function()
{
        return {
            getDomainConfig:function(){
                var config = {
                    'mDomain':{
                        'kaizhu':'kaizhu.m.xueqiu360.net',
                        'qingchun':'qingchun.m.xueqiu360.net',
                        'dev':'m.xueqiu360.net',
                        'prerelease':'mtest.gxq168.com',
                        'release':'m.gxq168.com'
                    },
                    'appwebDomain':{
                        'kaizhu':'kaizhu.appweb.xueqiu360.net',
                        'qingchun':'qingchun.appweb.xueqiu360.net',
                        'dev':'appweb.xueqiu360.net',
                        'prerelease':'appwebtest.gxq168.com',
                        'release':'appweb.gxq168.com'
                    },
                    'serviceDomain':{
                        'kaizhu':'kaizhu.service.xueqiu360.net',
                        'dev':'service.gxq168.net',
                        'prerelease':'servicetest.gxq168.com',
                        'release':'service.gxq168.com'
                    }
                };

                return config;
            }
        }
    }
);
