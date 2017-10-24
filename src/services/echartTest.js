import request from '../utils/request';
import { apiPrefix } from '../config/config';

export async function getCliAnalysis(data) {
  return request(`${apiPrefix}mcli/getCliAnalysis`, {
    method: 'POST',
    body: {
      chip_no: data.chip_no,
      scene_name: data.scene_name,
      shop_id: data.shop_id,
      startTime: data.start_time,
      endTime: data.end_time
    }
  });
}

export async function getFlowAnly(data) {
  return request(`${apiPrefix}flow/v1/query/getFlowAnly`, {
    method: 'POST',
    body: {
      chip_no: data.chip_no,
      scene_name: data.scene_name,
      shop_id: data.shop_id,
      start_time: data.startTime.format('YYYY-MM-DD'),
      end_time: data.endTime.format('YYYY-MM-DD'),
      dist_o: data.startTime.format('YYYY-MM-DD') == data.endTime.format('YYYY-MM-DD') ? data.dist_o : undefined,
      dist: data.startTime.format('YYYY-MM-DD') == data.endTime.format('YYYY-MM-DD') ? data.dist : undefined
    }
  });
}

// export async function cliProperty(data) {
//   return request(`${apiPrefix}baidu/cliProperty`, {
//     method: 'POST',
//     body: {
//       chip_no: data.chip_no,
//       scene_name: data.scene_name,
//       shop_id: data.shop_id,
//       time_start: data.startTime,
//       time_end: data.endTime
//     }
//   });
// }

export async function cliProperty(data) {
  return request(`${apiPrefix}potr/yz/query/forbox`, {
    method: 'POST',
    body: {
      chip_no: data.chip_no,
      date_start: data.date_start.format('YYYYMMDD'),
      date_end: data.date_end.format('YYYYMMDD')
    }
  });
}

export async function cliDistribute1(data) {
  return request(`${apiPrefix}baidu/cliDistribute`, {
    method: 'POST',
    body: {
      chip_no: data.chip_no,
      scene_name: data.scene_name,
      shop_id: data.shop_id,
      time_start: data.startTime,
      time_end: data.endTime
    }
  });
}

export async function cliDistribute(data) {
  return request(`${apiPrefix}potr/yz/query/getloc`, {
    method: 'POST',
    body: {
      datatype: data.datatype,
      areatype: data.areatype,
      chip_no: data.chip_no,
      date_start: data.date_start.format('YYYYMMDD'),
      date_end: data.date_end.format('YYYYMMDD')
    }
  });
}

export async function getUploadFlowCount(data) {
  return request(`${apiPrefix}flow/v1/upload/flowcount`, {
    method: 'POST',
    body: {
      chip_no: data.chip_no,
      scene_name: data.scene_name,
      time_start: data.time_start,
      time_end: data.time_end,
      flow_count: data.flow_count,
      ratio: data.ratio,
      is_final: data.is_final,
      adjust_type: data.adjust_type
    }
  });
}

export async function getTimerStayData(data) {
  return request(`${apiPrefix}flow/v1/query/gettimerstaydata`, {
    method: 'POST',
    body: {
      chip_no: data.chip_no,
      date: data.date,
      time_start: data.time_start,
      time_end: data.time_end,
      scene: data.scene,
    }
  })
}

export async function getOuterTimerCount(data) {
  return request(`${apiPrefix}flow/v1/query/getOuterTimerCount`, {
    method: 'POST',
    body: {
      scene: data.scene,
      chip_no: data.chip_no,
      date: data.date,
      dist: data.dist,
    }
  })
}