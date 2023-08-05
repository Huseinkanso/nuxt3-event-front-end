<template>
    <div v-if="errors">
        <div class="alert alert-danger alert-dismissible">{errors.value}</div>
    </div>
    <div>
        <h2>Comments</h2>
        <div v-if="comments">
            <!-- Existing Comments -->
            <div v-for="(comment, i) in comments" :key="i" class="comment">
                <div class="comment-header">
                    <strong>{{ comment.user_name }} </strong>-- {{ comment.created_at }}
                </div>
                <div class="comment-body ">
                    {{ comment.comment }}
                    <p><a href="#" @click.prevent="replyTo(comment.user_name, comment.id, comment.comment, -1)"
                            class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">reply</a>
                        <a v-if="comment.user_id == id" href="#" @click.prevent="deleteComment(comment.id)"
                            class="link-danger ms-1 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">delete</a>
                    </p>
                </div>
                <reply-comment :replies="comment.replies" :commentUserName="comment.user_name" :commentId="comment.id"
                    :replyTo="replyTo" :deleteReply="deleteReply" />
            </div>

            <!-- New Comment Input -->
            <div class="w-100 ">
                <h2>Add a Comment</h2>
                <form @submit.prevent="process">
                    <div class="container">
                        <div class="form-group d-flex gap-3 align-items-center">
                            <div class="w-100">
                                <p v-if="replyInfo.comment" class="m-0  replyMessage ps-2 py-1">reply to {{
                                    replyInfo.user_name
                                }}-- {{ replyInfo.comment }}
                                    <svg @click="resetReplyInfo" style="cursor:pointer;" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" class="bi bi-x " viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </p>
                                <textarea v-model="newComment" class="form-control w-100 m-auto pp" rows="1"
                                    placeholder="Your Comment" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary p-2 px-4">
                                <div v-if="isLoading" class="lds-dual-ring"></div>
                                <span v-else>add</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
onMounted(async () => {
    await getAllComments();
})
const props = defineProps(['event_id'])
const errors = ref();
const comments = ref([]);
const route = useRoute()
const id = userStore().user.id;
const newComment = ref('');
const isLoading = ref(false);
const isComment = ref(true);
const replyInfo = reactive({
    user_name: '',
    comment_id: -1,
    comment: '',
    parent_reply_id: -1,
})
const resetReplyInfo = () => {
    replyInfo.user_name = '';
    replyInfo.comment_id = -1;
    replyInfo.comment = '';
    replyInfo.parent_reply_id = -1;
    isComment.value = true;
}
function replyTo(user_name, comment_id, comment, replyToId) {
    replyInfo.user_name = user_name
    replyInfo.comment_id = comment_id
    replyInfo.comment = comment
    replyInfo.parent_reply_id = replyToId
    isComment.value = false;
    document.querySelector('.pp').focus();
}
const getAllComments = async () => {
    isLoading.value = true;
    const { data, error } = await useApiFetch(`/${route.params.show}/comments`);
    if (data.value)
        comments.value = data.value.comments;
    if (error.value)
        errors.value = error.value
    isLoading.value = false;
}
const addComment = async () => {
    isLoading.value = true;
    const payload = {
        event_id: props.event_id,
        comment: newComment.value,
        user_id: id
    };
    const { data, error } = await useApiFetch('/addComment', { method: 'post', body: payload });
    if (data.value) {
        newComment.value = '';
        resetReplyInfo();
        await getAllComments();
    }
    if (error.value)
        console.log(error.value);
    isLoading.value = false;
}
const addReply = async () => {
    isLoading.value = true;
    const payload = {
        reply: newComment.value,
        user_id: id,
        parent_reply_id: replyInfo.parent_reply_id,
        comment_id: replyInfo.comment_id
    };
    const { data, error } = await useApiFetch('/addReply', { method: 'post', body: payload });
    if (data.value) {
        newComment.value = '';
        resetReplyInfo();
        await getAllComments();
    }
    if (error.value)
        console.log(error.value);
    isLoading.value = false;
}
// useNuxtApp().$api.post('/addReply', {
//         reply: newComment.value,
//         user_id: id,
//         parent_reply_id: replyInfo.parent_reply_id,
//         comment_id: replyInfo.comment_id
//     }).then((res) => {
//         newComment.value = '';
//         resetReplyInfo();
//         getAllComments();
//         isLoading.value = false;
//     }).catch(err => {
//         isLoading.value = false;
//         console.error('Error:', err)
//     });


const process = () => {
    if (isComment.value)
        addComment();
    else
        addReply();
}
const deleteReply = async (id) => {
    isLoading.value = true;
    const { data, error } = await useApiFetch(`/delete-reply/${id}`, { method: 'delete' });
    if (!error.value)
        await getAllComments()
    isLoading.value = false;
}
const deleteComment = async (id) => {
    isLoading.value = true;
    const { data, error } = await useApiFetch(`/delete-comment/${id}`, { method: 'delete' });
    if (!error.value)
        await getAllComments();
    isLoading.value = false;
}
</script>

<style>
.comment {
    margin-bottom: 20px;
}

.comment-header {
    font-weight: bold;
    margin-bottom: 5px;
}

.reply {
    margin-left: 30px;
    margin-top: 10px;
    border-left: 2px solid #ccc;
    padding-left: 10px;
}

.reply-header {
    font-weight: bold;
    margin-bottom: 5px;
}

h2 {
    width: 100%;
    margin-left: 30px;
}

.lds-dual-ring {
    display: inline-block;
    width: 30px;
    height: 30px;
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 30px;
    height: 30px;
    margin: 0px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.replyMessage {
    background: #0d6efd;
    border-top-left-radius: 10px;
    color: white;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>