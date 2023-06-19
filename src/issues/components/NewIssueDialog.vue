<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation';

interface Props {
    isOpenProps: boolean;
    labelsProps: string[];
};

interface Emits {
    (e: 'onClose'):void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { isOpenProps, labelsProps } = toRefs(props);

const { issueMutation } = useIssueMutation();

const isOpen = ref<boolean>(false);

const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch( props, () => {
    isOpen.value = isOpenProps.value;
});

watch( () => issueMutation.isSuccess.value, (isSuccess) => {
    if (isSuccess) {
        title.value = '';
        body.value = '';
        labels.value = [];

        issueMutation.reset();
        emits('onClose');
    }
})

</script>
<template>
    <div class="q-pa-md q-gutter-sm">

        <q-dialog v-model="isOpen" position="bottom" persistent>
            <q-card style="width: 500px">
            <q-form @submit="issueMutation.mutate({ title, body, labels })">
                
                <q-linear-progress :value="1" color="primary" />
                <q-card-section class="column no-wrap">
                    <div>
                        <div class="text-weight-bold">New Issue</div>
                        <div class="text-grey">Add new issue withi labels</div>
                    </div>
                    <q-space />
                    <div>
                        <q-input class="q-mb-sm"
                            dense
                            filled
                            label="Title" 
                            placeholder="Title"
                            :rules="[ val => !!val || 'Field is required' ]"
                            v-model="title"/>

                        <q-select class="q-mb-sm" 
                            :options="labelsProps"
                            dense
                            filled
                            label="Multiple selection"
                            multiple
                            stack-label
                            use-chips
                            v-model="labels"
                        />
                        <!-- Markdow editor -->
                        <MdEditor 
                            v-model="body" 
                            placeholder="# Markdown"
                            language="en-US"
                            />
                    </div>
                </q-card-section>

                <q-card-actions align="left">
                    <q-btn
                        @click="emits('onClose')"
                        color="dark"
                        flat
                        label="Cancel"
                        v-close-popup
                        :disable="issueMutation.isLoading.value"
                    />
                    <q-space/>
                    <q-btn 
                        color="dark"
                        flat
                        label="Add issue"
                        type="submit"
                        :disable="issueMutation.isLoading.value"
                    />
                </q-card-actions>

            </q-form>
            </q-card>
        </q-dialog>

    </div>
</template>
<style scoped></style>