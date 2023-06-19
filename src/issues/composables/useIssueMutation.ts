import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

interface Args {
    body?: string;
    labels?: string[];
    title: string;
}

const addIssue = async({ title, body = '', labels = []  }: Args):Promise<Issue> => {

    const newIssueData = {
        title,
        body,
        labels,
    };

    const { data } = await githubApi.post<Issue>('/issues', newIssueData);
    console.log({data})
    return data;
};

const useIssueMutation = () => {

    const queryClient = useQueryClient();

    const issueMutation = useMutation( addIssue, {
        onSuccess: ( issue ) => {
            // invalidar query que contengan en su nombre 'issues'
            queryClient.invalidateQueries({
                queryKey: ['issues'],
                exact: false,
            });
            // realizar peticion nuevamente del cache issues
            queryClient.refetchQueries(
                ['issues'],
                { exact: false }
            );
            // dejar listo el nuevo issue en el cache
            queryClient.setQueryData(
                ['issue', issue.number],
                issue
            );
        },
        onSettled: () => {
            // cuando termina con error o exitosa
        }
    });

    return {
        issueMutation,
    }
 }

 export default useIssueMutation;