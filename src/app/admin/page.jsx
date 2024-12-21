"use client"
import React from 'react'
import dynamic from 'next/dynamic'
const Table = dynamic(() => import('../../components/Table'), { ssr: false });
export default function Admin() {
  return (
      <Table/>
  )
}
