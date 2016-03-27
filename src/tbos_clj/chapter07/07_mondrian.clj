(ns tbos-clj.07-mondrian
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  ; Turn off the border for the rectangle.
  (q/no-loop)
  (q/no-stroke))

(defn weighted-random-color-index []
  (let [r (q/random 1)]
    (if (< r 0.8)
       0
       (inc (rand-int 3)))))

;; Start with list of one rectangle [[0 0 600 600]]
;; Iterate n times
;;   randomly choose from list of rectangles, [x y w h]
;;   randomly choose to make a new horizontal or vertical
;;   if new vertical then
;;      randomly choose newx between x and x+w
;;      replace selected rectangle with two new ones:
;;          [x y (newx-x) h] [newx y (w-newx) h]
;;   else
;;      randomly choose new-y between y and y+h
;;      replace selected rectangle with two new ones:
;;          [x y w (newy-y)] [x newy w (h-newy)]
;;  

(defn draw []
  (let [w     (float (q/width))
        h     (float (q/height))
        edge-count 5
        edges (float-array 
                (for [_ (range (* 2 edge-count))]
                  (q/random 1)))
        ; Take the odd indexed items as xs and sort them
        ; Take the even indexed items as ys and sort them
        ; For three times:
        ;    Choose a random integer i between 0 and 4 and select xs[i] and xs[i+1]
        ;    Choose a random integer j between 0 and 4 and select ys[j] and ys[j+1]
        ;    return [xs[i] ys[j] xs[i+1] ys[j+1]]
        ; flatten that and set as u_squares uniform
        ; For three times:
        ;    Choose a random integer i between 0 and 2
        ;    return colors[i]
        xs (float-array 
              (sort
                (concat
                  (for [_ (range edge-count)]
                    (q/random 1)) [-0.1 1.1])))
        ys (float-array 
              (sort
                (concat
                  (for [_ (range edge-count)]
                    (q/random 1)) [-0.1 1.1])))
        color-indices (int-array 
                        (for [_ (range (* edge-count edge-count))]
                          (weighted-random-color-index)))
        frag  (q/load-shader "chapter07/07_mondrian.frag")]
    ; Set the user-defined uniform.
    ; (println color-indices)
    (doto frag
      (.set "u_xs" xs)
      (.set "u_ys" ys)
      (.set "u_color_indices" color-indices)
      (.set "u_edges" edges 2)
      (.set "u_resolution" w h))
    ; Set the shaders
    (q/shader frag)
    ; Draw the rectangle that will employ the shader.
    (q/rect 0 0 w h)))

(q/defsketch mondrian
  :title    "mondrian"
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [800 800])
