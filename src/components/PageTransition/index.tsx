/**
 * 懒加载过渡组件
 */

// react
import React from 'react'
import { FC, PropsWithChildren } from 'react'

interface PageTransitionProps {}

const PageTransition: FC<PageTransitionProps> = (props: PropsWithChildren<PageTransitionProps>) => {
  return (
    <div className="am-toast am-toast-mask">
      <span>
        <div className="am-toast-notice am-toast-notice-closable">
          <div className="am-toast-notice-content">
            <div className="am-toast-text am-toast-text-icon" role="alert" aria-live="assertive">
              <svg className="am-icon am-icon-loading am-icon-lg">
                <svg id="loading" viewBox="0 -2 59.75 60.25">
                  <path
                    fill="#ccc"
                    d="M29.69-.527C14.044-.527 1.36 12.158 1.36 27.806S14.043 56.14 29.69 56.14c15.65 0 28.334-12.686 28.334-28.334S45.34-.527 29.69-.527zm.185 53.75c-14.037 0-25.417-11.38-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.38 25.417 25.417-11.38 25.416-25.417 25.416z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#108ee9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    d="M56.587 29.766c.37-7.438-1.658-14.7-6.393-19.552"
                  ></path>
                </svg>
              </svg>
              <div className="am-toast-text-info">加载中...</div>
            </div>
          </div>
        </div>
      </span>
    </div>
  )
}

export default PageTransition
