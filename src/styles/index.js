export default {
  background: 'background',
}

// /v2/dashboard?type=time | duration
export const api = {
  code: 0,
  data: {
    groups: [
      {
        id: '91146411218833409',
        name: '1#机组',
      },
      {
        id: '91146411218833408',
        name: '2#机组',
      },
    ],
    payload: {
      unit: 'MW',
      list: [
        {
          group: '91146411218833409',
          value: 400,
          defaultValue: 800,
        },
        {
          group: '91146411218833408',
          value: 400,
          defaultValue: 800,
        },
      ],
    },
    startupTimes: [
      // 启动次数
      {
        group: '91146411218833408',
        list: [
          {
            date: '2022',
            value: 2,
          },
          {
            date: '2021',
            value: 2,
          },
          {
            date: '2020',
            value: 2,
          },
          {
            date: '2019',
            value: 2,
          },
          {
            date: '2018',
            value: 2,
          },
        ],
      },
      {
        group: '91146411218833409',
        list: [
          {
            date: '2022',
            value: 2,
          },
          {
            date: '2021',
            value: 2,
          },
          {
            date: '2020',
            value: 2,
          },
          {
            date: '2019',
            value: 2,
          },
          {
            date: '2018',
            value: 2,
          },
        ],
      },
    ],
    overtempSum: {
      times: [
        {
          date: '2018',
          value: 43,
        },
        {
          date: '2019',
          value: 43,
        },
        {
          date: '2020',
          value: 43,
        },
        {
          date: '2021',
          value: 43,
        },
        {
          date: '2022',
          value: 43,
        },
      ],
      durations: [
        {
          date: '2019-04-04 2020-04-04',
          value: 43,
        },
        {
          date: '2019-04-04 2020-04-04',
          value: 43,
        },
        {
          date: '2019-04-04 2020-04-04',
          value: 43,
        },
        {
          date: '2019-04-04 2020-04-04',
          value: 43,
        },
        {
          date: '2019-04-04 2020-04-04',
          value: 43,
        },
      ],
    },
    overtempLevels: [
      // 负荷段超温次数
      {
        group: '91146411218833409',
        unit: 'MW',
        list: [
          {
            value: 40,
            payloads: [0, 300],
          },
          {
            value: 30,
            payloads: [300, 450],
          },
          {
            value: 20,
            payloads: [450, 800],
          },
        ],
      },
    ],
    overtempList: [
      // 受热面
      // API: 详情（独立接口） => 超温列表
      {
        group: '91146411218833409',
        list: [
          {
            id: '94283647923674232',
            name: '水冷壁',
            value: 16,
          },
          {
            id: '94283647923674233',
            name: '水冷壁2',
            value: 18,
          },
        ],
      },
      {
        group: '91146411218833408',
        list: [
          {
            id: '94283647923674232',
            name: '水冷壁',
            value: 16,
          },
          {
            id: '94283647923674233',
            name: '水冷壁2',
            value: 18,
          },
        ],
      },
    ],
    ledger: [
      {
        group: '91146411218833408',
        static: [
          {
            name: '系统',
            value: 4,
          },
          {
            name: '测量位置',
            value: 8,
          },
          {
            name: '屏',
            value: 80,
          },
          {
            name: '管',
            value: 800,
          },
          {
            name: '段',
            value: 8000,
          },
        ],
        dynamic: [
          // 按钮查看
          {
            name: '2022-C', // 计划名称
            date: '2022-01-01', // 测量时间
            value: '', // 填报数量
          },
          {
            name: '2022-C', // 计划名称
            date: '2022-01-01', // 测量时间
            value: '', // 填报数量
          },
        ],
      },
      {
        group: '91146411218833409',
        list: [
          {
            name: '系统',
            value: 4,
          },
          {
            name: '测量位置',
            value: 8,
          },
          {
            name: '屏',
            value: 80,
          },
          {
            name: '管',
            value: 800,
          },
          {
            name: '段',
            value: 8000,
          },
        ],
        dynamic: [
          // 按钮查看
          {
            name: '2022-C', // 计划名称
            date: '2022-01-01', // 测量时间
            value: '', // 填报数量
          },
          {
            name: '2022-C', // 计划名称
            date: '2022-01-01', // 测量时间
            value: '', // 填报数量
          },
        ],
      },
    ],
  },
  fileCount: 100,
  errorCount: 10, // API
}
