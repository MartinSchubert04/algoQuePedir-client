// src/components/FloatingCartButton/FloatingCartButton.component.tsx
import { Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface FloatingCartButtonProps {
  count: number // Cantidad de ítems en el carrito
  path: string
}

export const FloatingCartButton = ({ count, path }: FloatingCartButtonProps) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "var(--nav-space)",
        paddingBottom: "var(--nav-sapce)",
        left: 0,
        right: 0,
        p: 2,
        backgroundColor: "white",
        borderTop: "1px solid #eee",
        zIndex: 1000,
      }}
    >
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={() => navigate(path)}
        sx={{
          backgroundColor: "#e30613",
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          py: 1.5,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#c70511",
          },
        }}
      >
        Ver pedido ({count})
      </Button>
    </Box>
  )
}
