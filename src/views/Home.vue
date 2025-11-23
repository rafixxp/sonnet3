<script setup>
import { ref } from 'vue'
import send from '../service'

const message = ref('')
const response = ref('')
const isLoading = ref(false)

const typeWriter = (text, element, speed = 10) => {
    let i = 0;
    element.value = '';
    const type = () => {
        if (i < text.length) {
            element.value += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

const handleSubmit = async () => {
    isLoading.value = true;
    const aiResponse = await send(message.value);
    console.log(aiResponse);
    typeWriter(aiResponse, response);
}

</script>

<template>
    <div class="container mt-5 pb-5 px-4">
        <div class="text-center mt-5 pt-3">
            <img src="https://img.freepik.com/free-vector/black-background-with-wavy-lines_52683-76524.jpg?semt=ais_hybrid&w=740&q=80" alt="dall-e" class="object-fit-cover rounded-circle bloom" width="90px" height="90px">
            <h5 class="fw-bold mt-4 p-0">Selamat Malam</h5>
            <h5 class="fw-bold">Hoax apa yang lagi <span class="text-primary">trend saat ini ?</span></h5>
        </div>

        <div class="w-50 mx-auto mt-4">
            <div class="card border-0 shadow-sm border-muted">
                <div class="card-body d-flex pt-3">
                    <span class="bi bi-stars me-2 fs-21 pt-1"></span>
                    <textarea v-model="message" @submit="handleSubmit" class="fs-21" rows="8" placeholder="Tempel teks disini untuk diperiksa kebenarannya" spellcheck="false"></textarea>
                </div>
                <div class="card-footer border-0 p-2 bg-white">
                    <button class="btn btn-sm btn-dark float-end mx-2 my-2 fs-9" @click="handleSubmit">Analisis <span class="bi bi-stars"></span></button>
                </div>
            </div>
        </div>

        <div class="w-50 mx-auto mt-5" v-if="isLoading">
            <h6 class="fs-21 fw-bold p-0 m-0"><span class="bi bi-stars me-2"></span>Jawaban dari AI</h6><br>
            <div class="ai-response" :class="{ 'typing': isLoading }">
                <span class="fs-21" v-html="response"></span>
                <span class="cursor" :class="{ 'blinking': isLoading }"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fs-21{
    font-size: 13px;
}
.w-50{
    width: 100% !important;
    max-width: 50rem !important;
}
textarea{
    width: 100%;
    border: 0;
}
textarea::-webkit-scrollbar{
    width: 0;
    height: 0;
}
textarea:focus{
    outline: none;
}
.card{
    border-radius: 13px;
}
.card-footer{
    border-radius: 13px;
}
.bloom{
    animation: bloom 1s ease-in-out infinite;
}
@keyframes bloom {
    0% {
        transform: scale(1);
        rotate: 0deg;
    }
    50% {
        transform: scale(1.05);
        rotate: 20deg;
    }
    100% {
        transform: scale(1);
        rotate: 0deg;
    }
}

.ai-response {
    min-height: 20px;
    position: relative;
    line-height: 1.6;
}

.cursor {
    display: inline-block;
    width: 8px;
    height: 20px;
    background-color: #000;
    margin-left: 2px;
    vertical-align: middle;
}

.blinking {
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
</style>