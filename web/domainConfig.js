define(function()
{
        return {
            getDomainConfig:function(){
                var config = {
                    'mDomain':{
                        'dev':'m.xueqiu360.net',
                        'prerelease':'mtest.gxq168.com',
                        'release':'m.gxq168.com'
                    },
                    'appwebDomain':{
                        'dev':'appweb.xueqiu360.net',
                        'prerelease':'appwebtest.gxq168.com',
                        'release':'appweb.gxq168.com'
                    },
                    'serviceDomain':{
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