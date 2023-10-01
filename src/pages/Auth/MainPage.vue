<script setup lang="ts">
import { Input } from "@/components/ui/input/";
import { ref } from "vue";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox/Checkbox.vue";
import Badge from "@/components/ui/badge/Badge.vue"
const user = ref<{
  oneId: string;
  password: string;
  isSuper: boolean;
  secretPassword?: string;
}>({
  oneId: "",
  password: "",
  isSuper: false,
  secretPassword: "",
});
</script>

<template>
  <div
    class="auth-main-page container mx-auto sm:px-4 px-3 flex flex-col items-center justify-evenly h-screen"
  >
    <h1 class="text-2xl font-bold">Admin panel</h1>
    <form class="w-full">
      <div class="form-group mb-6">
        <Label class="mb-2" for="oneId">One Id</Label>
        <Input
          autocomplete="off"
          id="oneId"
          name="oneId"
          type="text"
          v-model:model-value="user.oneId"
          required
        />
      </div>
      <div class="form-group mb-6">
        <Label class="mb-2" for="password">Parol</Label>
        <Input
          autocomplete="off"
          id="password"
          name="password"
          type="password"
          v-model:model-value="user.password"
          required
        />
      </div>
      <div v-show="user.isSuper" class="form-group mb-6">
        <Label class="mb-2" for="secretPassword">Sirli parol</Label>
        <Input
          autocomplete="off"
          id="secretPassword"
          name="secretPassword"
          type="password"
          v-model:model-value="user.secretPassword"
          required
        />
      </div>
      <div class="form-group flex space-x-4">
        <CheckBox v-model:checked="user.isSuper" id="isSuper" />
        <Label class="mb-2" for="isSuper">Super adminman</Label>
      </div>
      <div class="btns space-x-4 mt-6">
        <Button variant="outline" type="button">Tozalash</Button>
        <Button type="submit">Kirish</Button>
      </div>
    </form>
    <footer class="text-sm font-bold">
      <Badge variant="secondary">+998 99 944 76 13</Badge>
    </footer>
  </div>
</template>
