interface FieldNameConfig {
  [propName: string]: {
    /**
     * 接口名称
     */
    crux: string

    /**
     * 语义化显示
     */
    semantic: string

    /**
     * 详情关键字
     */
    dtbs: string
  }
}
const fieldNameConfig: FieldNameConfig = {
  A001: {
    crux: 'appeNewClient',
    semantic: '口袋E<br />新增准客户',
    dtbs: '新增时间',
  },
  A002: {
    crux: 'addJgjSign',
    semantic: '金管家<br />新增注册数',
    dtbs: '注册时间',
  },
  A003: {
    crux: 'jgjActive',
    semantic: '金管家<br />活跃人数',
    dtbs: '金管家活跃详情',
  },
  A004: {
    crux: 'jgjbindCard',
    semantic: '金管家<br />绑卡人数',
    dtbs: '绑卡时间',
  },

  B000: {
    crux: 'clientRead',
    semantic: '客户<br />阅读量',
    dtbs: '阅读详情',
  },
  B002: {
    crux: 'clientList',
    semantic: '客户名单<br />查看量',
    dtbs: '被查看时间',
  },
  B003: {
    crux: 'hookGoods',
    semantic: '钩子产品-产养健<br />购买件数',
    dtbs: '购买钩子产品详情',
  },
  B004: {
    crux: 'onLinePlay',
    semantic: '线上直播邀<br />约人数',
    dtbs: '被邀约时间',
  },

  C001: {
    crux: 'appeScanCode',
    semantic: '口袋E<br />扫码数',
    dtbs: '扫描业务员口袋E详情',
  },
  C002: {
    crux: 'peopleSayParty',
    semantic: '产说会<br />参会人数',
    dtbs: '最近的参与产说会时间',
  },
  C003: {
    crux: 'suggestBook',
    semantic: '建议书<br />制作量',
    dtbs: '收到建议书详情',
  },
  C004: {
    crux: 'insureBook',
    semantic: '投保书<br />制作量',
    dtbs: '收到投保书详情',
  },
  C005: {
    crux: 'longDanger',
    semantic: '长险件数',
    dtbs: '购买长险产品详情',
  },

  D001: {
    crux: 'fiveAndFive',
    semantic: '“标准服务5+5”<br />服务完成率',
    dtbs: '最近的被服务时间',
  },
}

export default fieldNameConfig
