<template>
  <div
    @click="triggerFileUpload"
    @dragover.prevent
    @drop.prevent="handleDrop"
    class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
  >
    <input
      type="file"
      @change="handleFileUpload"
      ref="fileInput"
      accept=".xlsx,.xls"
      class="hidden"
    />
    <p v-if="!file" class="text-gray-600">
      Drag & Drop your Excel file here or click to select.
    </p>
    <p v-else class="text-gray-800 font-medium">{{ file.name }}</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import * as XLSX from 'xlsx';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  export default defineComponent({
    emits: ['fileLoaded'],
    setup(_, { emit }) {
      const file = ref<File | null>(null);
      const fileInput = ref<HTMLInputElement | null>(null);

      const triggerFileUpload = () => {
        if (fileInput.value) {
          fileInput.value.click();
        }
      };

      const handleFileUpload = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const selectedFile = input.files[0];
          if (validateFileType(selectedFile)) {
            file.value = selectedFile;
            readFile(file.value);
          } else {
            showInvalidFileTypeToast();
          }
        }
      };

      const handleDrop = (event: DragEvent) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const droppedFile = files[0];
          if (validateFileType(droppedFile)) {
            file.value = droppedFile;
            readFile(file.value);
          } else {
            showInvalidFileTypeToast();
          }
        }
      };

      const validateFileType = (file: File) => {
        const validTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ];
        return validTypes.includes(file.type);
      };

      const showInvalidFileTypeToast = () => {
        toast.error('Please select a valid Excel file (.xlsx or .xls)', {
          position: 'top-right',
          autoClose: 3000,
        });
      };

      const readFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const bank = workbook.Props?.Author;
          console.log(`Bank = ${bank}`);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet);
          const fields = Object.values(json[5]);
          // omit the six rows of headers
          json.splice(0, 6);
          const mappedData = json.map((row: any[]) => {
            const rowData: { [key: string]: any } = {};
            const rowValues = Object.values(row);
            fields.forEach((field: string, index: number) => {
              rowData[field] = rowValues[index];
            });
            return rowData;
          });
          emit('fileLoaded', mappedData);
        };
        reader.readAsArrayBuffer(file);
      };

      return {
        file,
        fileInput,
        triggerFileUpload,
        handleFileUpload,
        handleDrop,
      };
    },
  });
</script>
