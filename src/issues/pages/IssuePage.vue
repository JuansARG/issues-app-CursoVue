<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';
import CommentList from '../components/comment-list/CommentList.vue';


const route = useRoute();
const { id }= route.params;

const { issueQuery, commentsQuery } = useIssue( +id );
console.log(commentsQuery.data.value)

</script>
<template>

    <router-link 
        class="text-white" 
        to="/"
    >Go back</router-link>

    <!-- Post -->
    <LoaderSpinner
        v-if="issueQuery.isLoading.value"
        color="white"
        :thickness="1"
        size="1.5rem"
        :show-text="false"
    />
    <IssueCard
        v-else-if="issueQuery.data.value"
        :issue="issueQuery.data.value"
    />
    <p v-else>Issue whit ID {{ id }} not found.</p>

    <!-- Comentarios -->
    <LoaderSpinner 
        v-if="commentsQuery.isLoading.value"
        color="white"
        :thickness="1"
        size="1.5rem"
        :show-text="false"
    />

    <div class="column" v-else-if="commentsQuery.data.value">
        <span class="text-h4 q-mb-md">Comments ({{ commentsQuery.data.value.length }})</span>
        
        <CommentList 
            :comments="commentsQuery.data.value"
        />
    </div>


</template>
<style scoped></style>