import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useIssuesStore = defineStore('Issues', () => {

    const state = ref<string>(''); // all, open, closed
    const labels = ref<string[]>([]);


    return {
        // State properties
        state,
        labels,

        // Getters

        // Actions
        toggleLabel: ( labelName: string ) => {
            throw new Error('No implementado');
        }
    };
});