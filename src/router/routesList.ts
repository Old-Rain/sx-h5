import { TheRoute } from './type'

import Zygl from '@/views/Zygl/routes' // 增员管理
import Xszc from '@/views/Xszc/routes' // 销售支持
import Gnz from '@/views/Gnz/routes' // 功能组
import Hygl from '@/views/Hygl/routes' // 会议管理
import Dwtc from '@/views/Dwtc/routes' // 单位投产
import Grjx from '@/views/Grjx/routes' // 个人绩效
import Hdgl from '@/views/Hdgl/routes' // 活动管理
import Pygl from '@/views/Pygl/routes' // 培养管理

export const routes: TheRoute[] = [...Zygl, ...Xszc, ...Gnz, ...Hygl, ...Dwtc, ...Grjx, ...Hdgl, ...Pygl]
