import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces/issue';
import { Comment } from '../interfaces/comment';

const getIssueById = async( issueNumber: number ): Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`);
    return data;
};

const getComments = async( issueNumber: number ): Promise<Comment[]> => {
    const { data } = await githubApi.get<Comment[]>(`/issues/${issueNumber}/comments`);
    return data;
};

interface Options {
    // Autoload issue and comments
    autoload?: boolean;
}

const useIssue = ( issueNumber: number, options?: Options ) => {

    const { autoload = true  } = options || {};

    const queryClient = useQueryClient();

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssueById(issueNumber),
        {
            staleTime: 1000 * 60,
            enabled: autoload,
        }
    );

    const commentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getComments( issueNumber ),
        // () => getComments(issueQuery.data.value?.number || 0),
        {
            staleTime: 1000 * 30,
            enabled: autoload,
            // enabled: computed(() => !!issueQuery.data.value)
        }
    );

    const prefetchIssue = ( issueNumber: number ) => {
        queryClient.prefetchQuery(
            ['issue', issueNumber],
            () => getIssueById(issueNumber),
            { staleTime: 1000 * 60 }
        );

        queryClient.prefetchQuery(
            ['issue', issueNumber, 'comments'],
            () => getComments( issueNumber ),
            { staleTime: 1000 * 30 }
        );
    };

    const setIssueCashData = ( issue: Issue ) => {
        queryClient.setQueryData(
            ['issue', issue.number],
            issue
        );
    }


    return {
        issueQuery,
        commentsQuery,
        

        // Methods
        prefetchIssue,
        setIssueCashData,
    }
 }

 export default useIssue;