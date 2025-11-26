package com.geekplaynode.forumservicio.service;

import com.geekplaynode.forumservicio.dto.CommentResponse;
import com.geekplaynode.forumservicio.dto.CreateCommentRequest;
import com.geekplaynode.forumservicio.dto.UpdateCommentRequest;
import com.geekplaynode.forumservicio.model.Comment;
import com.geekplaynode.forumservicio.model.Post;
import com.geekplaynode.forumservicio.repository.CommentRepository;
import com.geekplaynode.forumservicio.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 1. OBTENER COMENTARIOS DE UN POST
    public List<CommentResponse> getCommentsByPost(Long postId) {
        return commentRepository.findByPostIdOrderByCreadoEnDesc(postId).stream()
                .map(CommentResponse::fromComment)
                .collect(Collectors.toList());
    }

    // 2. CREAR COMENTARIO
    @Transactional
    public CommentResponse createComment(Long postId, CreateCommentRequest request, 
                                        Long autorId, String autorNombre, String autorAvatar) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post no encontrado"));

        Comment comment = Comment.builder()
                .contenido(request.getContenido())
                .post(post)
                .autorId(autorId)
                .autorNombre(autorNombre)
                .autorAvatar(autorAvatar)
                .build();

        Comment saved = commentRepository.save(comment);
        return CommentResponse.fromComment(saved);
    }

    // 3. ACTUALIZAR COMENTARIO (solo el autor o admin)
    @Transactional
    public CommentResponse updateComment(Long commentId, UpdateCommentRequest request, 
                                        Long userId, String role) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));

        // Verificar permisos
        if (!comment.getAutorId().equals(userId) && !"ADMIN".equals(role)) {
            throw new RuntimeException("No tienes permiso para editar este comentario");
        }

        comment.setContenido(request.getContenido());

        Comment updated = commentRepository.save(comment);
        return CommentResponse.fromComment(updated);
    }

    // 4. ELIMINAR COMENTARIO (solo el autor o admin)
    @Transactional
    public void deleteComment(Long commentId, Long userId, String role) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));

        // Verificar permisos
        if (!comment.getAutorId().equals(userId) && !"ADMIN".equals(role)) {
            throw new RuntimeException("No tienes permiso para eliminar este comentario");
        }

        commentRepository.deleteById(commentId);
    }

    // 5. CONTAR COMENTARIOS DE UN POST
    public long countCommentsByPost(Long postId) {
        return commentRepository.countByPostId(postId);
    }
}