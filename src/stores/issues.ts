import { defineStore } from 'pinia';
import { State } from 'src/issues/interfaces/issue';
import { ref } from 'vue';


export const useIssuesStore = defineStore('Issues', () => {

    const state = ref<State>(State.All); // all, open, closed
    const labels = ref<string[]>([]);


    return {
        // State properties
        state,
        labels,

        // Getters

        // Actions
        toggleLabel: ( labelName: string ):void => {
            if ( labels.value.includes( labelName ) ){
                labels.value = labels.value.filter( label => label !== labelName );
                return;
            }

            labels.value.push( labelName );
        }
    };
});