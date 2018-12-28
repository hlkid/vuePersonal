//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

//列表数据
const tableData_test=[
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"},
    {id:"eeee",title:"港珠澳大桥开通",cloumn:"新闻动态",create:"admin",updatetime:"2017-08-09",status:"提交"}
]

const chartLine=[
    {time:"2017-10",count:randomNum(15,60)},
    {time:"2017-11",count:randomNum(15,60)},
    {time:"2017-12",count:randomNum(15,60)},
    {time:"2018-1",count:randomNum(15,60)},
    {time:"2018-2",count:randomNum(15,60)},
    {time:"2018-3",count:randomNum(15,60)},
    {time:"2018-4",count:randomNum(15,60)},
    {time:"2018-5",count:randomNum(15,60)},
    {time:"2018-6",count:randomNum(15,60)},
    {time:"2018-7",count:randomNum(15,60)},
    {time:"2018-8",count:randomNum(15,60)},
    {time:"2018-9",count:randomNum(15,60)}
];
const chartBar=[
    {region:"贵州省",count:randomNum(69,377)},
    {region:"四川省",count:randomNum(69,377)},
    {region:"上海市",count:randomNum(69,377)},
    {region:"安徽省",count:randomNum(69,377)},
    {region:"天津市",count:randomNum(69,377)},
    {region:"海南省",count:randomNum(69,377)},
    {region:"青海省",count:randomNum(69,377)},
    {region:"山西省",count:randomNum(69,377)},
    {region:"辽宁省",count:randomNum(69,377)},
    {region:"重庆市",count:randomNum(69,377)},
    {region:"内蒙古自治区",count:randomNum(69,377)},
    {region:"贵州省",count:randomNum(69,377)},
    {region:"四川省",count:randomNum(69,377)},
    {region:"上海市",count:randomNum(69,377)},
    {region:"安徽省",count:randomNum(69,377)},
    {region:"天津市",count:randomNum(69,377)},
    {region:"海南省",count:randomNum(69,377)},
    {region:"青海省",count:randomNum(69,377)},
    {region:"山西省",count:randomNum(69,377)},
    {region:"辽宁省",count:randomNum(69,377)},
    {region:"重庆市",count:randomNum(69,377)},
    {region:"内蒙古自治区",count:randomNum(69,377)},
    {region:"贵州省",count:randomNum(69,377)},
    {region:"四川省",count:randomNum(69,377)},
    {region:"上海市",count:randomNum(69,377)},
    {region:"安徽省",count:randomNum(69,377)},
    {region:"天津市",count:randomNum(69,377)},
    {region:"海南省",count:randomNum(69,377)},
    {region:"青海省",count:randomNum(69,377)},
    {region:"山西省",count:randomNum(69,377)},
    {region:"辽宁省",count:randomNum(69,377)},
    {region:"重庆市",count:randomNum(69,377)},
    {region:"内蒙古自治区",count:randomNum(69,377)},
    {region:"河北省",count:randomNum(69,377)}
]
export {
    chartBar,
    chartLine,
    tableData_test
}