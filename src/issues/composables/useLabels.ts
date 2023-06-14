import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Label } from '../interfaces/label';
import { useIssuesStore } from '../../stores/issues';
import { storeToRefs } from 'pinia';


const getLabels = async(): Promise<Label[]> => {

    const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
    return data;
}

const useLabels = () => {

    const issuesStore = useIssuesStore();
    const { labels } = storeToRefs(issuesStore);

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60, // una hora
        }
    );

    return {
        labelsQuery,

        // Getters
        selectedLabels: labels,
        // selectedLabels: computed(() => issuesStore.labels),

        // Methods
        toogleLabel: ( name:string ) => issuesStore.toggleLabel(name),
    }
 }

 export default useLabels;