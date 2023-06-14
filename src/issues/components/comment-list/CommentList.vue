<script setup lang="ts">
import { Comment } from '../../interfaces/comment';
import CommentCard from './CommentCard.vue';

interface Props {
    comments: Comment[];
}

const props = defineProps<Props>();


</script>
<template>
    <div class="row">
        <CommentCard 
            v-for="comment of props.comments"
            :comment="comment"
            :key="comment.id"
        />
    </div>
</template>
<style scoped></style>