import { connect } from 'dva';
import styles from './Form.css'
import ECharts from 'echarts-for-react';
import {Button} from 'antd'
function NormalLoginForm({dispatch,echartTest}) {
  function getBarOptoin(outdata,indata){
    const option={
      title: { text: '店内外人数分析' },
      tooltip: {trigger: 'axis'},
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ["0~2","2~4","4~6","6~8","8~10","10~12","12~14","14~16","16~18","18~20","20~22","22~24"]
      },
      yAxis: {type:'value'},
      legend: {
        data:['店外人数','店内人数']
      },
      series: [
        {
          name: '店外人数',
          type: 'line',
          smooth: true,
          lineStyle: {
              normal: {
                  width: 3,
                  shadowColor: 'rgba(0,0,0,0.4)',
                  shadowBlur: 10,
                  shadowOffsetY: 10
              }
          },
          data: outdata
        },
        {
          name: '店内人数',
          type: 'line',
          data: indata
        },
    ]
    }
      return option
  }

  function getPieOptoin(){
    const option={
      title: { text: 'ECharts bar柱状图' },
      tooltip: {},
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
      itemStyle: {  //鼠标滑过加阴影
        emphasis: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      series: [{
          name: '销量',
          type: 'pie',
          radius:"55%",  //饼图大小
         //  roseType: 'angle', //南丁格尔图会通过半径表示数据的大小。
          data:[
            {value:235, name:'视频广告'},
            {value:274, name:'联盟广告'},
            {value:310, name:'邮件营销'},
            {value:335, name:'直接访问'},
            {value:400, name:'搜索引擎'}
        ]
      }]
    }
      return option
  }
  (function testGet(){
    dispatch({
      type:"echartTest/testGetdata",
      payload:{
        chip_no:'',
        scene_name:'',
        shop_id:365,
        start_time:'2017-09-24',
        end_time:'2017-10-23',
        dist_o:'',
        dist:'',
      }
    })
  })();
  function test(){
    const option = {
      title : {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: { //导航小块位置
          // orient: 'vertical',
          // left: 'left',
          bottom: 10,
          left: 'center',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };
  return option;
  }
  return (
    <div>
        <ECharts 
          option={getBarOptoin(echartTest.period,echartTest.period_in)}
          style={{height: '400px', width: '100%'}}
        />
        <ECharts 
        option={test()}
        style={{height: '400px', width: '100%'}}
      />
      
    </div>
 
  )
}

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);


function mapStateToProps({echartTest}) {
  return {echartTest};
}

export default connect(mapStateToProps)(NormalLoginForm);