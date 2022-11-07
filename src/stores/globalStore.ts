import { AdmissionAdminProgramListResponse } from "@/api/admission/admin/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useGlobalStore = defineStore('global', ()=>{
  const program=ref<AdmissionAdminProgramListResponse>()

  return { program }
})