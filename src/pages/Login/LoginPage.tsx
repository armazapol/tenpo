import { Field } from "@/components/ui/field";
import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { InputGroup } from "@/components/ui/input-group";
import { validateEmail } from "@/utilities";
import { authenticate } from "@/services/auth/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const simulateSuccess = async () => {
    return {
      status: 200,
      data: {
        message: "Inicio de sesión exitoso",
        token:
          "token_enviado",
      },
    };
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    setTimeout(async () => {
      if (authenticate(data.email, data.password)) {
        
        try {
          const response = await simulateSuccess();
          if(response.status === 200){
            localStorage.setItem("token", response.data.token);
            navigate("/home");
          }else{
            throw new Error(`Error: ${response.status} - ${response.data.message}`)
          }
      
        } catch {
          toaster.create({
            type: "error",
            title: "Error",
            description: "Ocurrió un error al obtener los datos.",
          });
        }
       

       
      } else {
        toaster.create({
          type: "error",
          title: "Error de autenticación",
          description:
            "El email o la contraseña son incorrectos. Por favor, verifica tus credenciales.",
        });
      }

      setIsLoading(false);
    }, 2000);
  });

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.50">
      <Toaster />
      <Box
        p={8}
        maxWidth={["90%", "400px"]}
        width="full"
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        <form onSubmit={onSubmit}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field
              label="Correo"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <InputGroup
                flex="1"
                startElement={<MdOutlineEmail />}
                width="full"
              >
                <Input
                  colorPalette="teal"
                  placeholder="usuario@example.com"
                  autoFocus
                  {...register("email", {
                    required: "Correo es requerido",
                    validate: (value) =>
                      validateEmail(value) || "Correo electrónico inválido",
                  })}
                />
              </InputGroup>
            </Field>
            <Field
              label="Contraseña"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <InputGroup
                flex="1"
                startElement={<RiLockPasswordLine />}
                width="full"
              >
                <PasswordInput
                  colorPalette="teal"
                  placeholder="********"
                  {...register("password", {
                    required: "Contraseña es requerido",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
              </InputGroup>
            </Field>
            <Button
              type="submit"
              colorPalette="teal"
              variant="solid"
              width="full"
              mb={4}
              loading={isLoading}
              loadingText="Cargando"
              spinnerPlacement="start"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
      {/* </div> */}
    </Flex>
  );
};

export default LoginPage;
