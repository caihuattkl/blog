var Mock = require('mockjs');

export default function() {
  return Mock.mock({
    'list|10-20': [{
      'id|+1': 1
    }]
  });
}

export function exams() {
  return Mock.mock('www.g.cn/exams','get',{
    'data|5': [{
      "id|+1":1,
      'chargeId|1':['1477712060454', '1477712060453', '1477712060452', '1477712060451'],
      'examDate|2': ['2017-04-26'],
      "examId|100000-100000000000000":0,
      'url':function(){
      	return [1,2,3,4,5]
      },
      'examName|':"test_2017_去ESB3_同步考生@id"
    }]
  });
}
